import { useNavigate, useParams } from "react-router-dom";
import { StyledForm, ButtonContainer } from "./CreateGuest";
import SearchIntolerances from "../components/SearchIntolerances";
import { UserContext } from "../context/UserContext";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import GuestNameInput from "../components/GuestNameInput";
import BasicButton from "../components/BasicButton";

export default function EditGuest() {
  const navigate = useNavigate();
  const { guestArray, editGuest } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest._id === id);
  const { name, intolerances, notes, _id } = guestDetails[0];
  const [activeEditList, setActiveEditList] = useState(intolerances);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    if (newName.value.trim() === "") {
      newName.value = "";
      alert("Each name must have one letter at least.");
    } else {
      editGuest(_id, newName.value, activeEditList, newNotes.value);
      navigate("/");
    }
  }

  return (
    <>
      <Header title="Edit Guest" isInfoButton={true} />
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name</label>
        <GuestNameInput defaultName={name} />
        <SearchIntolerances
          completelyNewSearch={false}
          activeList={activeEditList}
          setActiveList={setActiveEditList}
        />
        <label htmlFor="newNotes">Notes</label>
        <textarea name="newNotes" id="newNotes" defaultValue={notes}></textarea>
        <ButtonContainer>
          <BasicButton description="back" handleClick={() => navigate("/")} />
          <BasicButton description="submit" />
        </ButtonContainer>
      </StyledForm>
    </>
  );
}
