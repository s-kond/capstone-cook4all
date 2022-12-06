import "@testing-library/jest-dom";
import "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import GuestNameInput from "../components/GuestNameInput";

describe("input field requires valid usernames", () => {
  it("should accept regular usernames", async () => {
    render(
      <form data-testid="form">
        <GuestNameInput />
      </form>
    );
    const form = screen.getByTestId("form");
    const inputfield = screen.getByRole("textbox");
    await userEvent.type(inputfield, "Sarah");
    expect(form).toBeValid();
  });

  it("should not accept empty usernames", async () => {
    render(
      <form data-testid="form">
        <GuestNameInput />
      </form>
    );
    const form = screen.getByTestId("form");
    const inputfield = screen.getByRole("textbox");
    await userEvent.type(inputfield, "  ");
    expect(form).not.toBeValid();
  });

  it("should require an input", () => {
    render(
      <form data-testid="form">
        <GuestNameInput />
      </form>
    );
    const inputfield = screen.getByRole("textbox");
    expect(inputfield).toBeRequired();
  });

  it("should not allow input of usernames with more than 40 letters", async () => {
    render(
      <form data-testid="form">
        <GuestNameInput />
      </form>
    );
    const inputfield = screen.getByRole("textbox");

    await userEvent.type(
      inputfield,
      "asdfubsafubasdfiusabfiusdffsufbisaudfbsf asiudfbasdufbaisdufbaisudfbaisubfiusabdf"
    );
    expect(inputfield.value).toHaveLength(40);
  });
});
