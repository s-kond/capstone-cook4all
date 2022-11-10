import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import InfoModal from "../components/InfoModal";

test("close-infoModal-button exists and works", async () => {
  const toggleState = jest.fn();
  render(<InfoModal isModalOpen={true} setIsModalOpen={toggleState} />);
  const closeButton = screen.getByRole("button", { name: "X" });
  expect(closeButton).toBeInTheDocument();
  await userEvent.click(closeButton);
  expect(toggleState).toBeCalledTimes(1);
});
