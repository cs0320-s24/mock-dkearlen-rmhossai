import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLMockCSV } from "./REPLMockCSV";

/** 
  @author devonkearleng rmhossai
  @version 1.0 - REPL is the main class in our frontend. It holds the REPLFunction, which is the interface that allows
  developers to create their own functions without changing preexisting code, and our interface Reply, which holds
  all of the data necessary within a reply
*/

// Interface to define the structure of a reply object
export interface Reply {
  // Indicates whether the reply is verbose or not
  verbose: boolean;
  // The command value associated with the reply
  commandValue: string;
  // The output value of the reply, could be a string or a 2D array
  outputValue: string | string[][];
}

// Interface for defining REPL functions
export interface REPLFunction {
  (commandWords: Array<string>): string | string[][];
}

/**
 * The REPL component manages the Read-Eval-Print Loop (REPL) functionality of the frontend.
 * It holds the REPL history and input components, allowing users to interact with the REPL.
 */
export default function REPL() {
  // State to manage REPL history
  const [history, setHistory] = useState<Reply[]>([]);
  return (
    <div className="repl">
      {/* This lays out the components of our frontend while also sharing data that is necessary to be shared amongst classes. */}
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} />
    </div>
  );
}
