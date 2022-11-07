import { useNavigate, useParams } from "react-router-dom";
import { StyledHeader } from "./Home";
import { StyledForm } from "./CreateGuest";
import SearchIntolerances from "../components/SearchIntolerances";
import { UserContext } from "../util/UserContext";
import { useContext, useState } from "react";
import Header from "../components/Header";

export default function EditGuest({ onHandleEditSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, intolerances, notes } = guestDetails[0];
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
      <Header title="Edit Guest" />
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
        <SearchIntolerances
          completelyNewSearch={false}
          activeList={activeEditList}
          setActiveList={setActiveEditList}
        />
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" defaultValue={notes}></textarea>
        <button type="submit">Submit</button>
        <button onClick={() => navigate(`/`)}>Back</button>
      </StyledForm>
    </>
  );
}
