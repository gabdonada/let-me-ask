import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> //Tipagem do typescript

export function Button(props: ButtonProps){

    return(
        <button className="button" {...props}/>
    )
}
