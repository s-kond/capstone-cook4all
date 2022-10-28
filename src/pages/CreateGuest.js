import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { StyledHeader } from "./Home";
import SearchIntolerances from "../components/SearchIntolerances";

export default function CreateGuest({ onHandleSubmit }) {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    if (newName.value.trim() === "") {
      newName.value = "";
      alert("Each name must have one letter at least.");
    } else {
      onHandleSubmit(newName.value, newNotes.value, activeList);
      navigate("/");
    }
  }

  return (
    <>
      <StyledHeader>
        <h2>Add a guest</h2>
      </StyledHeader>
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <input
          name="newName"
          id="newName"
          type="text"
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
