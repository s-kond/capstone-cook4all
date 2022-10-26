import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledHeader } from "./Home";
import { UserContext } from "../util/UserContext";
import { useContext } from "react";

export default function EditGuest({ guestData, onHandleEditSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, notes } = guestDetails[0];

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    if (newName.value.trim() === "") {
      newName.value = "";
      alert("Each name must have one letter at least.");
    } else {
      onHandleEditSubmit(id, newName.value, newNotes.value);
      navigate("/");
    }
  }

  return (
    <>
      <StyledHeader>
        <h2>Edit</h2>
      </StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <input
          name="newName"
          id="newName"
          type="text"
          minLength={1}
          maxLength={40}
          defaultValue={name}
          required
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" defaultValue={notes}></textarea>
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
