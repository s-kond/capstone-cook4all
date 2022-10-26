import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef } from "react";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";

export default function CreateGuest({ onHandleSubmit }) {
  const navigate = useNavigate();
  const [filteredIntolerance, setFilteredIntolerance] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const intolerancesRef = useRef();

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

  function searchIntolerance(input) {
    const results = search(input, possibleIntolerances).slice(0, 3);
    setFilteredIntolerance(results);
  }

  function addToActive(intolerance) {
    setActiveList([...activeList, intolerance]);
    setFilteredIntolerance(
      filteredIntolerance.filter((item) => item !== intolerance)
    );
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
  }

  function removeFromActive(intolerance) {
    setFilteredIntolerance([...filteredIntolerance, intolerance]);
    setActiveList(activeList.filter((item) => item !== intolerance));
  }

  return (
    <>
      <h2>Add a guest</h2>
      <StyledForm onSubmit={onSubmit}>
        <label htmlFor="newName">Name: </label>
        <input
          name="newName"
          id="newName"
          type="text"
          maxLength={40}
          required
        />
        <label htmlFor="newIntolerances">Intolerances:</label>
        <StyledList>
          {activeList.map((item) => (
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
        <textarea name="newNotes" id="newNotes" />
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

export const StyledList = styled.ul`
  margin: 10px auto;
  list-style-type: "-";
  padding: 0;

  li {
    width: auto;
  }
`;
