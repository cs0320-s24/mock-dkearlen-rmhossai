import { Dispatch, SetStateAction } from "react";

interface loginProps {
  // Current authentication status
  isLoggedIn: boolean;
  // Function to update the authentication status
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * The LoginButton component renders a login/logout button based on the user's authentication status.
 * It toggles the authentication status when clicked.
 */
export function LoginButton(props: loginProps) {
  /**
   * Toggles the authentication status and updates the state accordingly.
   * @returns The new authentication status after toggling.
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };
  // Render different buttons based on authentication status
  if (props.isLoggedIn) {
    return (
      <button aria-label="Sign Out" onClick={authenticate}>
        Sign out
      </button>
    );
  } else {
    return (
      <button aria-label="Login" onClick={authenticate}>
        Login
      </button>
    );
  }
}
