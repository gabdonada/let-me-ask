import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoGoogle from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function Home(){
    const history = useHistory();
    //const {user, signInWithGoogle} = useContext(AuthContext); //it cames from the context of App, that means user info
    const {user, signInWithGoogle} = useAuth(); //using like this remove 2 imports

    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        history.push('/rooms/new')

    }

    async function handleJoinRoom(event:FormEvent) { //FormEvent is used when using an forms in HTML
        event.preventDefault();

        if(roomCode.trim()== ''){
            return;
        }
    
        const roomRef = await database.ref(`rooms/${roomCode}`).get();//it search just the number that the user is typing and the get() is used to get all details related to the room.

        if(!roomRef.exists()){
            alert('Room does not exist');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Cire Salas de Q&amp;A em real time</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk Logo" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={logoGoogle} alt="Logo da Google" />
                        Crie sua sala com Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event =>setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}