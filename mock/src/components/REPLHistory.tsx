
import { text } from 'stream/consumers';
import { REPLFunction, Reply } from '../components/REPL.js';
import '../styles/main.css';
/**
 * @author devonkearleng rmhossai
 * @version 1.0 - REPLHistory handles and prints the Reply based on the Reply information.
 */
interface REPLHistoryProps{
    history: Reply[];
}
/**
 * @param props - The props given by the main REPL class.
 * @returns - Returns information to the user based on what they inputted. 
 */
export function REPLHistory(props : REPLHistoryProps) {
    return (
      <div className="repl-history">
        {props.history.map((command, index) => {
          // This will run if the mode is brief and the output is a 2D array.
          if (!command.verbose && Array.isArray(command.outputValue)) {
            return (
            <table>
              {/** This code below turns our 2D array output into a table. */}
              <tbody>
                {command.outputValue.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            );
          // This will run if the mode is brief and the output is not a 2D array.
          } else if (!command.verbose && !Array.isArray(command.outputValue)) {
            return (
              <pre key={index} className={"history-text"}>
                {command.outputValue}
              </pre>
            );
          // This will run if the mode is verbose and the output is a 2D array.
          } else if (command.verbose && Array.isArray(command.outputValue)) {
            // TODO: Make it so that the output is centered.
            return (
              <pre>
                <pre key={index} className={"history-text"}>
                  Command: {command.commandValue}
                </pre>
                <pre key={index} className={"history-text"}>
                  Output:
                </pre>
                <table>
                  {/** This code below turns our 2D array output into a table. */}
                  <tbody>
                    {command.outputValue.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </pre>
            );
            // This will run if the modeis verbose and the output is not a 2D array.
          } else if (command.verbose && !Array.isArray(command.outputValue)) {
            return (
              <pre>
                <pre key={index} className={"history-text"}>
                  Command: {command.commandValue}
                </pre>
                <pre key={index} className={"history-text"}>
                  Output: {command.outputValue}
                </pre>
              </pre>
            );
          } else {
            return (
              <pre key={index} className={"history-text"}>
                Command: {command.commandValue}, Output: {command.outputValue}
              </pre>
            );
          }
        })}
      </div>
    );
}