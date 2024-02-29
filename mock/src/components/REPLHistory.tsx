import { text } from 'stream/consumers';
import { Reply } from "../components/REPL.js";
import '../styles/main.css';

interface REPLHistoryProps{
    history: Reply[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">\
    // TODO: Map differently when we use view/search since we have a table now. Figure out how to do that tomorrow.
      {props.history.map((command, index) => (
        <pre key={index} className={"history-text"}>{command.outputValue}</pre>
      ))}
    </div>
  );
}