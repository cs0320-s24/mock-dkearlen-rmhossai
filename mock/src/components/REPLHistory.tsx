import { text } from 'stream/consumers';
import '../styles/main.css';

interface REPLHistoryProps{
    history: string[];
}

export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This command puts the input onto the screen. */}
            {props.history.map((command, index) => <p> {command} </p>)}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
        </div>
    );
}