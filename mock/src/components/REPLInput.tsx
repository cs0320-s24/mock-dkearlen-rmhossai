import '../styles/main.css';
import { REPLFunction, Reply } from '../components/REPL.js';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { REPLMockCSV, REPLMockCSVResponse } from './REPLMockCSV';

interface REPLInputProps {
  history: Reply[];
  // What setHistory does will track all the input in the order that it was inputted.
  setHistory: Dispatch<SetStateAction<Reply[]>>;
}
// TODO: Check to see if verbose should be a boolean or a 
class ReplyInstance implements Reply {
  constructor(
    public verbose: boolean,
    public commandValue: string,
    public outputValue: string | string[][]
  ) {}
}

const commandMap = new Map<string, REPLFunction>();

export function REPLInput(props : REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Creates a count state
  const [submitCount, addSubmitCount] = useState<number>(0);
  // Create a mode setter and getter.
  const [getMode, setMode] = useState<string>("Brief");
  // Create a getter and setter for the CSV data in order to keep track amongst load, search, and view.
  const [getCSV, setCSV] = useState<string[][]>();
  let csvMap = REPLMockCSV();
  let csvResponseMap = REPLMockCSVResponse();
  // Creates a function to handle the submit button
  function handleSubmit(commandString: string) {
    addSubmitCount(submitCount + 1);
    let lowerCommand = new String(commandString.toLowerCase());
    let commandWords = lowerCommand.split(" ");
    commandMap.set("load_file", handleLoad);
    commandMap.set("mode", handleModes);
    commandMap.set("view", handleView);
    commandMap.set("search", handleSearch);
    handleCommands(commandWords);
  }

  function handleCommands(commandWords: string[]) {
    // Checks to see if the mode command was called. If so, the function switchModes will execute.
    // TODO: Ensure that this logic works for load_file
    let reply = new ReplyInstance(false, "", []);
    let command = commandMap.get(commandWords[0]);
    // If the command does not exist, the handle function should just return.
    if (command === undefined) {
      reply.outputValue = "Command not found!";
      props.setHistory([...props.history, reply]);
      return;
    }
    // All this code should only run if a valid command was given.
    reply.commandValue = commandWords[0];
    if (command === handleModes){
      // TODO: outputValue isn't correct but reply.verbose is!
      reply.outputValue = command(commandWords);
      // Though this logic seems backwards as to what brief and verbose should be, this must be backwards since the setter
      // won't run until after the event handler is finished.
      if (getMode.localeCompare("Brief") === 0) {
        reply.verbose = true;
      } else if (getMode.localeCompare("Verbose") === 0) {
        reply.verbose = false;
      }
    } else {
      reply.outputValue = command(commandWords);
    }
    props.setHistory([...props.history, reply]);
  }

  // Creates a function to handle changing between modes
  const handleModes: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    let mode = "";
    if (getMode.localeCompare("Brief") === 0) {
      setMode("Verbose");
      mode = "Verbose";
    }
    if (getMode.localeCompare("Verbose") === 0) {
      setMode("Brief");
      mode = "Brief";
    }
    return "Mode: " + mode;
  };
  
  const handleLoad: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    // TODO: See if using CSVMap can stay consistent with a backend, or if this is just good mocking.
    // First check if the csv is undefined or actually exists
    let csv = csvMap.get(commandWords[1]);
    if (csv === undefined) {
      return "Loading file failed!";
    }
    // Only once we can check if the csv exists should we change the const throughout the input, and that the file loaded successfully.
    setCSV(csv);
    return "File Loaded Successfully!";
  };

  const handleView: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    if (getCSV === undefined) {
      return "No loaded file found!";
    }
    // TODO: Make sure that this works as intended (should print a table).
    return getCSV;
  };

  const handleSearch: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    if (getCSV === undefined){
      return "No loaded file found!";
    }
    let concatenateResponse = commandWords[1] + " " + commandWords[2]
    let csvResponse = csvResponseMap.get(concatenateResponse);
    if (csvResponse === undefined){
      return "No results found for given query!"
    }
    return csvResponse;
  };

  
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Handles what should happen when the button is clicked. */}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {submitCount} times.
      </button>
    </div>
  );
}