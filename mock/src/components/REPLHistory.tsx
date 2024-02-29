import { text } from 'stream/consumers';
import '../styles/main.css';

interface REPLHistoryProps{
    history: string[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">\
    // TODO: Map differently when we use view/search since we have a table now. Figure out how to do that tomorrow.
      {props.history.map((command, index) => (
        <pre key={index} className={"history-text"}>{command}</pre>
      ))}
    </div>
  );
}