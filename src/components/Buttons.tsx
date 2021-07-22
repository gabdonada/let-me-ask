import { count } from "console"
import { useState } from "react";

type ButtonProps = {
    text?: string; //? torna opcional
    children?: string;
}

export function Buttons(props: ButtonProps){
    // let counter = 0;
    const [counter, setCounter] = useState(0);

    function increment(){
        setCounter(counter + 1);
    }

    return(
       
        <button onClick={increment}>{counter}</button>
    )
}
 // <button>{props.text || props.children ||'Default'}</button>

