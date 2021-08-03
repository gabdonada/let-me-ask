import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoGoogle from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'

export function Home(){
    const history = useHistory();
    //const {user, signInWithGoogle} = useContext(AuthContext); //it cames from the context of App, that means user info
    const {user, signInWithGoogle} = useAuth(); //using like this remove 2 imports

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        history.push('/rooms/new')

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
                    <form action="">
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}