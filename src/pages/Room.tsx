import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


import '../styles/room.scss';
import { useEffect } from 'react';

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>


export function Room(){
    const { user } = useAuth();
    const parms = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    const roomId = parms.id;

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
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parseQuestions);
        })
    }, [roomId]); //useEffect send an event when something change;
        //roomId is here to reload the variable

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
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
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
                {JSON.stringify(questions)}
            </main>
        </div>
    );
}