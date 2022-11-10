import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("Header shows title", () => {
  render(<Header title="this is a test" />);
  const header = screen.getByRole("banner");
  const headline = screen.getByRole("heading");

  expect(header).toContainElement(headline);
  expect(headline).toHaveAccessibleName("this is a test");
});
