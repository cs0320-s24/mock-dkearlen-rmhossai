import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
interface ControlledInputProps {
  // Current value of the input
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  // Concretely, this means "a function that sets a state containing a string".
  // Function to update the input value
  setValue: Dispatch<SetStateAction<string>>;
  // ARIA label for accessibility
  ariaLabel: string;
}

// Input boxes contain state. We want to make sure React is managing that state,
// so we have a special component that wraps the input box.

/**
 * The ControlledInput component renders an input box with controlled state management.
 * It ensures React manages the state of the input box value.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
