import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';
import { useHistory, useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';


type RoomParams = {
    id: string;
}


export function AdminRoom(){
    const parms = useParams<RoomParams>();
    const history = useHistory()
    const roomId = parms.id;
    const { title, questions} = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/'); //redirect the user to main page
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Você deseja excluir esta pergunta?')){ //confirm returns a boolean 
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }


    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk Logo" />
                    <div>
                        <RoomCode code={parms.id}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button> {/** as isOutlined is a boolean, you don't need to set it true: isOutlined={true}, you just need to call it */}
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>
                

                <div className="question-list">
                    {questions.map(question =>{{/* just like for each */}
                        return (
                            <Question
                                key = {question.id}
                                content = {question.content}
                                author = {question.author}
                            >
                                <button
                                    type="button"
                                    onClick={()=> handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta"/>

                                </button>
                            </Question>
                        );
                    })}
                </div>
                             

                {/* {JSON.stringify(questions)} */}
            </main>
        </div>
    );
}