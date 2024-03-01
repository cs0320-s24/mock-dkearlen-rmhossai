import "../styles/main.css";
import { REPLFunction, Reply } from "../components/REPL.js";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  REPLMockCSV,
  REPLMockCSVResponse,
  REPLCSVMalformed,
} from "./REPLMockCSV";

/**
 * @author devonkearleng rmhossai
 * @version 1.0 - REPLInput is the main class where we handle submissions which will then be handled by REPLHistory
 */

// The interface REPLInputProps is where we will hold the data given by REPL.
interface REPLInputProps {
  history: Reply[];
  // What setHistory does will track all the input in the order that it was inputted.
  setHistory: Dispatch<SetStateAction<Reply[]>>;
}

// The class ReplyInstance is a class that implements the interface Reply so that we can add it to history.
class ReplyInstance implements Reply {
  constructor(
    public verbose: boolean,
    public commandValue: string,
    public outputValue: string | string[][]
  ) {}
}
const commandMap = new Map<string, REPLFunction>();

/**
 * @param props - The props given by the main REPL class.
 */
export function REPLInput(props: REPLInputProps) {
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
  let csvMalformedMap = REPLCSVMalformed();
  /**
   * Handles the submission of a command string.
   * @param commandString - The input command string.
   */
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
  /**
   * @param commandWords - Takes in the input given by the user but after being split and put into lowercase.
   * @returns - Returns nothing, but adds to the history if a reply is given.
   */
  function handleCommands(commandWords: string[]) {
    // Checks to see if the mode command was called. If so, the function switchModes will execute.
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
    if (command === handleModes) {
      // Though this logic seems backwards as to what brief and verbose should be, this must be backwards since the setter
      // won't run until after the event handler is finished.
      reply.outputValue = command(commandWords);
      let mode = reply.outputValue.toString();
      if (mode.localeCompare("Mode: Verbose") === 0) {
        reply.verbose = true;
      } else if (mode.localeCompare("Mode: Brief") === 0) {
        reply.verbose = false;
      }
    } else {
      if (getMode.localeCompare("Verbose") === 0) {
        reply.verbose = true;
      } else {
        reply.verbose = false;
      }
      reply.outputValue = command(commandWords);
    }
    props.setHistory([...props.history, reply]);
  }

  // handler functions for different commands

  /**
   * @param commandWords - The array of words given by the user.
   * @returns - Returns a string with the output we want to be fed back to the user.
   */
  const handleModes: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    let mode;
    if (getMode.localeCompare("Brief") === 0) {
      setMode("Verbose");
      mode = "Verbose";
    } else {
      setMode("Brief");
      mode = "Brief";
    }
    return "Mode: " + mode;
  };
  /**
   *
   * @param commandWords - The array of words given by the user.
   * @returns - Returns a string saying if either loading the file succeeded or failed.
   */
  const handleLoad: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    // First check if the csv is undefined or actually exists in our CSV map.
    let csv = csvMap.get(commandWords[1]);
    let csvMalformed = csvMalformedMap.get(commandWords[1]);
    if (csvMalformed !== undefined) {
      return "Cannot load malformed data!";
    }
    if (csv === undefined) {
      return "Loading file failed!";
    }
    // Only once we can check if the csv exists should we change the const throughout the input, and that the file loaded successfully.
    setCSV(csv);
    return "File Loaded Successfully!";
  };
  /**
   * @param commandWords - The array of words given by the user.
   * @returns - Returns either a string saying no file was found or returns a 2D array representing the table we want.
   */
  const handleView: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    if (getCSV === undefined) {
      return "No loaded file found!";
    }
    // TODO: Make sure that this works as intended (should print a table).
    return getCSV;
  };
  /**
   * @param commandWords - The array of words given by the user.
   * @returns - Returns either a string saying no file was found or returns a 2D array representing the table we want.
   */
  const handleSearch: REPLFunction = (
    commandWords: Array<string>
  ): string | string[][] => {
    if (getCSV === undefined) {
      return "No loaded file found!";
    }
    let concatenateResponse = commandWords[1] + " " + commandWords[2];
    let csvResponse = csvResponseMap.get(concatenateResponse);
    if (csvResponse === undefined) {
      return "No results found for given query!";
    }
    return csvResponse;
  };

  /**
   * REPLInput returns all the components of the input, including the command line and the submit button.
   */
  return (
    <div className="repl-input">
      {/** This section handles the command line. */}
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
