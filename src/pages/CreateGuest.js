import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CreateGuest({ onHandleSubmit }) {
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    onHandleSubmit(newName.value, newNotes.value);
    navigate("/");
  }

  return (
    <>
      <h2>Add a guest</h2>
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <input
          name="newName"
          id="newName"
          type="text"
          maxLength={40}
          required
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" />
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  margin-top: 10px;
  input {
    display: block;
    margin: 10px auto;
  }

  textarea {
    display: block;
    margin: 10px auto;
  }
`;
