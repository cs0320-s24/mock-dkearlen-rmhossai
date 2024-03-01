import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../../mock/src/components/App";

test("renders login button by default", () => {
  render(<App />);
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeTruthy();
});

test("clicking login button toggles login state", () => {
  render(<App />);
  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);
  const logoutButton = screen.getByRole("button", { name: "Sign Out" });
  expect(logoutButton).toBeTruthy();
});

test("displays REPL component when logged in", () => {
  render(<App />);
  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);
  const replComponent = screen.getByTestId("repl-component");
  expect(replComponent).toBeTruthy();
});
