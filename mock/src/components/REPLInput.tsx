import '../styles/main.css';
import { Reply } from "../components/REPL.js";
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps{
  history: Reply[];
  // What setHistory does will track all the input in the order that it was inputted. 
  setHistory: Dispatch<SetStateAction<Reply[]>>;
}
// TODO: Ensure that just keeping the interface return value to be a string is needed.
// Also ask Albert if putting the interface in the REPLInput makes sense or if it should be somewhere else.
export interface REPLFunction {
  (commandWords: Array<string>): string | string[];
}

const commandMap = new Map<string, REPLFunction>();
// Keep a map for mocked CSV data
// TODO: Keep all the mocked CSV data in another file or smth
const csvMap = new Map<string, string[][]>();
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Creates a count state
  const [submitCount, addSubmitCount] = useState<number>(0);
  // Create a mode setter and getter.
  const [getMode, setMode] = useState<string>("Brief");
  // Create a filepath getter and setter.
  const [getFilepath, setFilepath] = useState<string>("");
  // Create a getter and setter for the CSV data in order to keep track amongst load, search, and view.
  const [getCSV, setCSV] = useState<string[][]>();
  // Creates a function to handle the submit button
  function handleSubmit(commandString: string) {
    addSubmitCount(submitCount + 1);
    let lowerCommand = new String(commandString.toLowerCase());
    let commandWords = lowerCommand.split(" ");
    commandMap.set("load_file", handleLoad);
    commandMap.set("mode", handleModes);
    commandMap.set("view_file", handleView);
    csvMap.set("data", [
      ["Sirius", "Procyon", "Vega"],
      ["Betelgeuse", "Rigel", "Aldebaran"],
      ["Polaris", "Antares", "Alphard"],
    ]);
    handleCommands(commandWords);
  }

  function handleCommands(commandWords: string[]) {
    // Checks to see if the mode command was called. If so, the function switchModes will execute.
    // TODO: Ensure that this logic works for load_file
    const newReply: Reply {
      verbose: true,
      commandValue: "some command",
      outputValue: [["output 1", "output 2"]]
    }
    let command = commandMap.get(commandWords[0]);
    // If the command does not exist, the handle function shoudl just return.
    if (command === undefined) {
      return;
    }
    let response = command(commandWords);
    if (getMode.localeCompare("Brief") === 0) {
      props.setHistory([...props.history, response + "\n"]);
    } else if (getMode.localeCompare("Verbose") === 0) {
      props.setHistory([
        ...props.history,
        "Command: " + commandWords[0] + "\n" + "Output: " + response,
      ]);
    }
  }

  // Creates a function to handle changing between modes
  const handleModes: REPLFunction = (
    commandWords: Array<string>
  ): string => {
    if (getMode.localeCompare("Brief") === 0) {
      setMode("Verbose");
    }
    if (getMode.localeCompare("Verbose") === 0) {
      setMode("Brief");
    }
    return "Mode: " + getMode;
  };
  
  const handleLoad: REPLFunction = (
    commandWords: Array<string>
  ): string | string[] => {
    // TODO: See if using CSVMap can stay consistent with a backend, or if this is just good mocking.
    // First check if the csv is undefined or actually exists
    let csv = csvMap.get(commandWords[1]);
    if (csv === undefined) {
      return "Loading file failed!";
    }
    // Only once we can check if the csv exists should we change the const throughout the input, and that the file loaded successfully.
    setCSV(csvMap.get(commandWords[1]));
    return "File Loaded Successfully!";
  };

  const handleView: REPLFunction = (
    commandWords: Array<string>
  ): string | string[] => {
    if (getCSV === undefined) {
      return "No loaded file found!";
    }
    // TODO: Make sure that this works as intended (should print a table).
    return generateTable(getCSV);
  };

  const handleSearch: REPLFunction = (
    commandWords: Array<string>
  ): string | string[] => {
    // TODO: change this return value
    return "";
  };

  /**
   * @param data - data is used to represent the CSV data we want to pass in
   * @returns - returns a string that is the html we need to use to print out the table
   */
  function generateTable(data: string[][]): string{
    let html = "<table border='1'>";
    for (let row of data) {
      html += "<tr>";
      for (let cell of row) {
        html += `<td>${cell}</td>`;
      }
      html += "</tr>";
    }
    html += "</table>";
    return html;
  }
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