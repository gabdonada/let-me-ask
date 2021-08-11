import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

export const AuthContext = createContext({} as AuthContextType); //used for user context


type User = {
    id: string,
    name: string,
    avatar: string
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; //promise because async await returns a promise
  }
  
type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<User>();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{ //check in firebase if exist an authentication done for this user (used to do not ask multiple times the same login)
        //unsubscribe used to stop using the event and avoid erros.
        if(user){
            const {displayName, photoURL, uid } = user;
    
            if(!displayName || !photoURL){
                throw new Error('Missing information from Google Acount');
            }
    
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
        })

        return () =>{
            unsubscribe(); 
        }
    }, []) //what I want to run and when I want to run; when the array is empty it will run once when loading the page for the first time

    async function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

            
        if(result.user){
            const {displayName, photoURL, uid } = result.user;

        if(!displayName || !photoURL){
            throw new Error('Missing information from Google Acount');
        }

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        })
        }
                
            
    }

    return(
        <AuthContext.Provider value={{user , signInWithGoogle}}> 
            {props.children}
        </AuthContext.Provider>
    );
}