import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header";
import ReactModal from "react-modal";
import SearchIntolerances from "../components/SearchIntolerances";

export default function CreateGuest({ onHandleSubmit }) {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    onHandleSubmit(newName.value, activeList, newNotes.value);
    navigate("/");
  }

  return (
    <>
      <Header title="New Guest" />
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <input
          name="newName"
          id="newName"
          type="text"
          //this pattern prevents users from submiting empty whitespace-filled names
          pattern=".*[^\s]{1,}.*"
          maxLength={40}
          required
        />
        <SearchIntolerances
          completelyNewSearch={true}
          activeList={activeList}
          setActiveList={setActiveList}
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" />
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </StyledForm>
    </>
  );
}

export const StyledForm = styled.form`
  input {
    display: block;
    margin: 10px auto;
  }

  label {
    display: block;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 10px;
    }
  }

  textarea {
    display: block;
    margin: 10px auto 20px auto;
  }
`;
