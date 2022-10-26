import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledHeader } from "./Home";
import { StyledList } from "./CreateGuest";
import { UserContext } from "../util/UserContext";
import { useContext, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";

export default function EditGuest({ onHandleEditSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, intolerances, notes } = guestDetails[0];
  const [filteredIntolerance, setFilteredIntolerance] = useState([]);
  const [activeEditList, setActiveEditList] = useState(intolerances);
  const intolerancesRef = useRef();

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

  function searchIntolerance(input) {
    const results = search(input, possibleIntolerances).slice(0, 3);
    setFilteredIntolerance(results);
  }

  function addToActive(intolerance) {
    setActiveEditList([...activeEditList, intolerance]);
    setFilteredIntolerance(
      filteredIntolerance.filter((item) => item !== intolerance)
    );
    intolerancesRef.current.focus();
  }

  function removeFromActive(intolerance) {
    setFilteredIntolerance([...filteredIntolerance, intolerance]);
    setActiveEditList(activeEditList.filter((item) => item !== intolerance));
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
        <label htmlFor="newIntolerances">Intolerances:</label>
        <StyledList>
          {activeEditList.map((item) => (
            <li>
              <button type="button" onClick={() => removeFromActive(item)}>
                {item}
              </button>
            </li>
          ))}
        </StyledList>
        <input
          name="newIntolerances"
          id="newIntolerances"
          type="text"
          ref={intolerancesRef}
          onChange={(event) => searchIntolerance(event.target.value)}
        />
        <div>
          {filteredIntolerance.map((item) => (
            <button type="button" onClick={() => addToActive(item)}>
              {item}
            </button>
          ))}
        </div>
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
