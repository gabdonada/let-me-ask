 //this is a component because it repeats many times, so it is cool use it in order to avoid too much code in other pages
import { ReactNode } from 'react' //anything that can be in a return

import '../styles/question.scss' 

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };

    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;

}

export function Question({
    children,
    content, 
    author,
    isAnswered = false,
    isHighlighted = false
    }: QuestionProps){ //use {content, author} instead of props in order to unstructure the data and use just the details needed
    return (
        <div className={`question ${isAnswered ? 'answered': ''} ${isHighlighted ? 'highlighted' : '' && !isAnswered}`}> {/** you can use classnames from NPM (yarn add classnames) */}
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.avatar} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}