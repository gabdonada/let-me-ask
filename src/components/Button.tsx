import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}//Tipagem do typescript

export function Button({isOutlined = false, ...props}: ButtonProps){ //...props is the rest operator, so everything that is not isOutlined will be there

    return(
        <button 
            className={`button ${isOutlined ? 'outlined ': ''}`} // in case that isOutlined is true, then use outlined class, else nothing
            {...props}
        />
    )
}
