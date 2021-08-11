import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string,
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    //hasLiked: boolean;
    likeId: string | undefined;
}
type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string,{
        authorId: string
    }>
}>

export function useRoom(roomId: string){ //hooks are used for shared functions.
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room =>{ //on to keep checking and once for one time check
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};//?? to check if it is empty and if so return a null array {}
            
            const parseQuestions = Object.entries(firebaseQuestions).map( ([key, value])=> {  //Object.entries wiil put it in an array;  ([key, value]) is used to unstructure
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length, // ?? {} is used in case that values.likes is empty
                    //hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id) //some will check the array until find the values that you are looking for; some return true or false; 
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0] //find, instead, returns the object that you are looking for; ?.[0] is used to try to access the array, in case that have not found, it will not access due the ? but if it does, then it will take the [0] in the array
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parseQuestions);
        })

        return () =>{
            roomRef.off('value');//it will remove ALL event listeners for the useEffect
        }
    }, [roomId, user?.id]); //useEffect send an event when something change;
        //roomId is here to reload the variable; user is here just in case that the user id changes, the tool loads the questions again

    return { questions, title }
}