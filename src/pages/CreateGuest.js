import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header";
import SearchIntolerances from "../components/SearchIntolerances";
import GuestNameInput from "../components/GuestNameInput";
import SubmitButton from "../components/Buttons/SubmitButton";
import BackButton from "../components/Buttons/BackButton";

export default function CreateGuest({ createGuest }) {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    createGuest(newName.value, activeList, newNotes.value);
    navigate("/");
  }

  return (
    <>
      <Header title="New Guest" />
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="newName">Name</label>
        <GuestNameInput />
        <SearchIntolerances
          completelyNewSearch={true}
          activeList={activeList}
          setActiveList={setActiveList}
        />
        <label htmlFor="newNotes">Notes</label>
        <textarea name="newNotes" id="newNotes" />
        <ButtonContainer>
          <BackButton handleClick={() => navigate("/")} />
          <SubmitButton type="submit" />
        </ButtonContainer>
      </StyledForm>
    </>
  );
}

export const StyledForm = styled.form`
  text-align: left;
  height: 100vh;
  width: 80vw;
  margin: 20px auto 0 auto;
  font-size: 1.3rem;
  input {
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid black;
    padding: 8px;
    width: 100%;
    min-width: 200px;

    &:last-of-type {
      width: 70%;
    }
  }

  label {
    display: block;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 10px;
    }
  }

  textarea {
    margin: 10px auto 20px auto;
    border-radius: 10px;
    border: 1px solid black;
    width: 100%;
    max-width: 100%;
    height: 80px;
  }
`;

export const ButtonContainer = styled.section`
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  button {
    background-color: transparent;
    border: unset;
  }
`;
