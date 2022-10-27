import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef } from "react";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";
import compareArrays from "../util/CompareArrays";
import { StyledHeader } from "./Home";

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
    const results = search(input, possibleIntolerances, {
      keySelector: (obj) => obj.name,
    }).slice(0, 3);
    setFilteredIntolerance(compareArrays(activeList, results));
  }

  function addToActive(intolerance) {
    setActiveList([...activeList, intolerance]);
    setFilteredIntolerance([]);
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
  }

  function removeFromActive(intolerance) {
    setActiveList(activeList.filter((item) => item !== intolerance));
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
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
        <label htmlFor="newIntolerances">Food should be:</label>
        <input
          name="newIntolerances"
          id="newIntolerances"
          type="text"
          placeholder="e.g. fish-free"
          ref={intolerancesRef}
          onChange={(event) => searchIntolerance(event.target.value)}
        />
        <section>
          {activeList.map((item) => (
            <StyledActiveIntolerance
              key={item.id}
              type="button"
              onClick={() => removeFromActive(item)}
            >
              {item.name} x
            </StyledActiveIntolerance>
          ))}
        </section>
        <section>
          {filteredIntolerance.map((item) => (
            <StyledSearchResult
              key={item.id}
              type="button"
              onClick={() => addToActive(item)}
            >
              + {item.name}
            </StyledSearchResult>
          ))}
        </section>
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

export const StyledActiveIntolerance = styled.button`
  background-color: var(--primary-color);
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 8px;
  border: unset;
  border-radius: 35px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledSearchResult = styled.button`
  background-color: var(--secondary-color);
  margin-bottom: 10px;
  margin-right: 5px;
  padding: 8px;
  border: unset;
  border-radius: 35px;

  &:hover {
    cursor: pointer;
  }
`;
