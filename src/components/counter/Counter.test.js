import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("counter add button workss", async () => {
  render(<Counter />);

  const addButton = screen.getByRole("button", { name: "+" });
  await userEvent.click(addButton);
  await userEvent.click(addButton);
  await userEvent.click(addButton);

  const output = screen.getByText("Current count:", { exact: false });

  expect(output).toHaveTextContent("Current count: 3");
});
