import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
import { REPLMockCSV } from './REPLMockCSV';

/** 
  @author devonkearleng rmhossai
  @version 1.0 - REPL is the main class in our frontend. It holds the REPLFunction, which is the interface that allows
  developers to create their own functions without changing preexisting code, and our interface Reply, which holds
  all of the data necessary within a reply
*/

export interface Reply {
  verbose: boolean;
  commandValue: string;
  outputValue: string | string[][];
}

export interface REPLFunction {
  (commandWords: Array<string>): string | string[][];
}


export default function REPL() {
  const [history, setHistory] = useState<Reply[]>([]);
  return (
    <div className="repl">
      {/* This lays out the components of our frontend while also sharing data that is necessary to be shared amongst classes. */}
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
      />
    </div>
  );
}
