import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledHeader } from "./Home";
import { StyledActiveIntolerance, StyledSearchResult } from "./CreateGuest";
import { UserContext } from "../util/UserContext";
import { useContext, useState, useRef } from "react";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";
import { nanoid } from "nanoid";

export default function EditGuest({ onHandleEditSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, intolerances, notes } = guestDetails[0];
  const [filteredIntolerance, setFilteredIntolerance] = useState([]);
  const [activeEditList, setActiveEditList] = useState(intolerances);
  const intolerancesRef = useRef();
  const [editedIntolerances, setEditedIntolerances] = useState([]);

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

  function compareArrays(userIntolerances, allPossibleIntolerances) {
    let editedPossibleIntolerances = [];
    for (let i = 0; i < allPossibleIntolerances.length; i++) {
      if (userIntolerances.includes(allPossibleIntolerances[i])) {
        continue;
      } else {
        editedPossibleIntolerances.push(allPossibleIntolerances[i]);
      }
    }
    setEditedIntolerances(editedPossibleIntolerances);
  }

  function searchIntolerance(input) {
    compareArrays(activeEditList, possibleIntolerances);
    const results = search(input, editedIntolerances).slice(0, 3);
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
    setEditedIntolerances([intolerance, ...editedIntolerances]);
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
        <label htmlFor="newIntolerances">Food should be:</label>
        <input
          name="newIntolerances"
          id="newIntolerances"
          type="text"
          ref={intolerancesRef}
          onChange={(event) => searchIntolerance(event.target.value)}
        />
        <section>
          {activeEditList.map((item) => (
            <StyledActiveIntolerance
              key={nanoid()}
              type="button"
              onClick={() => removeFromActive(item)}
            >
              {item}
            </StyledActiveIntolerance>
          ))}
        </section>
        <section>
          {filteredIntolerance.map((item) => (
            <StyledSearchResult
              key={nanoid()}
              type="button"
              onClick={() => addToActive(item)}
            >
              {item}
            </StyledSearchResult>
          ))}
        </section>
        <label htmlFor="newNotes">Notes: </label>
        <textarea name="newNotes" id="newNotes" defaultValue={notes}></textarea>
        <button type="submit">Submit</button>
        <button onClick={() => navigate(`/details/${id}`)}>Back</button>
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
