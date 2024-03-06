import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * The App component serves as the highest-level component of the application.
 * It manages user authentication state and renders the main interface components.
 */
function App() {
  // State variable to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Render the main interface components based on user authentication status
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
