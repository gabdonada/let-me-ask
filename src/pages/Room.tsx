import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


import '../styles/room.scss';


type RoomParams = {
    id: string;
}


export function Room(){
    const { user } = useAuth();
    const parms = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    

    const roomId = parms.id;


    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim()==''){
            return;
        }

        if(!user){
            throw new Error('You are not authenticated') //reach hot toast would be better for this case
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question); //in the ${roomId} in the question section, it will create the question param above

        setNewQuestion('');

    }


    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk Logo" />
                    <RoomCode code={parms.id}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala teste</h1>
                    <span>4 Perguntas</span>
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="Type your question"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}                        
                    />
                
                    <div className="form-footer">
                        { user ? ( //this is an IF to check if the user is authenticated
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div> //in case that the user is logged
                        ) : (
                            <span>Para fazer uma pergunta, <button>Faça seu login</button>.</span> // In case that the user is not logged
                        ) }
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>

            </main>
        </div>
    );
}