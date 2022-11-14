import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header";
import InfoModal from "../components/InfoModal";
import SearchIntolerances from "../components/SearchIntolerances";
import GuestNameInput from "../components/GuestNameInput";

export default function CreateGuest({ createGuest }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <label htmlFor="newName">Name: </label>
        <GuestNameInput />
        <SearchIntolerances
          completelyNewSearch={true}
          activeList={activeList}
          setActiveList={setActiveList}
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" />
        <StyledInfoButton
          type="button"
          title="intolerances, diets, ..."
          onClick={() => setIsModalOpen(true)}
        >
          more info
        </StyledInfoButton>
        <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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

export const StyledInfoButton = styled.button``;
