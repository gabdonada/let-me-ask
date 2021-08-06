import {Link, useHistory} from 'react-router-dom'
import { FormEvent , useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoGoogle from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function NewRoom(){
    //const {user} = useContext(AuthContext)
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');

    const history = useHistory();
    
    async function handleCreateRoom(event: FormEvent) {//all forms submits an event
        event.preventDefault(); //avoit the page to reaload when submitting a form
        
        if(newRoom.trim()==''){
            return;
        }

        const roomRef = database.ref('rooms'); //All data of rooms will be here and you can insert all needed, string, int, ..

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id, //it comes from useAuth() '?' because user still as undefined variable
        })//inserting values in the roomRef

        history.push(`/rooms/${firebaseRoom.key}`); //render to the room created. firebaseRoom.key is used to take the room created key. use "craze" from portuguese `/rooms/`
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={event=>setNewRoom(event.target.value)} 
                            value={newRoom}
                            /> {/**event is related to the input change and not the above. */}
                        <Button type="submit">Criar Sala</Button>
                    </form>

                    <p>Quer entrar em uma sala existente: <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>
    )
}