import { useNavigate, useParams } from "react-router-dom";
import InfoModal from "../components/InfoModal";
import { StyledForm, StyledInfoButton } from "./CreateGuest";
import SearchIntolerances from "../components/SearchIntolerances";
import { UserContext } from "../util/UserContext";
import { useContext, useState } from "react";
import Header from "../components/Header";
import GuestNameInput from "../components/GuestNameInput";

export default function EditGuest({ onHandleEditSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, intolerances, notes } = guestDetails[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEditList, setActiveEditList] = useState(intolerances);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { newName, newNotes } = form.elements;
    if (newName.value.trim() === "") {
      newName.value = "";
      alert("Each name must have one letter at least.");
    } else {
      onHandleEditSubmit(id, newName.value, activeEditList, newNotes.value);
      navigate("/");
    }
  }

  return (
    <>
      <Header title="Edit Guest" isInfoButton={true} />
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <GuestNameInput defaultName={name} />
        <SearchIntolerances
          completelyNewSearch={false}
          activeList={activeEditList}
          setActiveList={setActiveEditList}
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" defaultValue={notes}></textarea>
        <StyledInfoButton
          type="button"
          title="intolerances, diets, ..."
          onClick={() => setIsModalOpen(true)}
        >
          more info
        </StyledInfoButton>
        <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <button type="submit">Submit</button>
        <button onClick={() => navigate(`/`)}>Back</button>
      </StyledForm>
    </>
  );
}
