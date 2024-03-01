import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControlledInput } from "../../src/components/ControlledInput";

test("renders an input element", () => {
  const { container } = render(<ControlledInput />);
  const inputElement = container.querySelector("input");
  expect(inputElement).not.toBeNull();
  expect(inputElement?.tagName).toBe("INPUT");
});

test("updates the input value when typing", () => {
  const { container } = render(<ControlledInput />);
  const inputElement = container.querySelector("input");
  const testValue = "Test Value";

  if (inputElement) {
    userEvent.type(inputElement, testValue);

    // Assert that the input value has been updated correctly
    expect(inputElement.value).toBe(testValue);
  } else {
    throw new Error("Input element not found");
  }
});
