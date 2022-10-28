import { useState, useRef } from "react";
import styled from "styled-components";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";
import compareArrays from "../util/CompareArrays";

export default function SearchIntolerances({
  completelyNewSearch,
  activeList,
  setActiveList,
}) {
  const [filteredIntolerance, setFilteredIntolerance] = useState([]);
  const [editedIntolerances, setEditedIntolerances] = useState([]);
  const intolerancesRef = useRef();

  function searchIntolerance(input) {
    if (!completelyNewSearch) {
      setEditedIntolerances(compareArrays(activeList, possibleIntolerances));
    }
    const results = search(
      input,
      completelyNewSearch ? possibleIntolerances : editedIntolerances,
      {
        keySelector: (obj) => obj.name,
      }
    ).slice(0, 3);
    setFilteredIntolerance(compareArrays(activeList, results));
  }

  function addToActive(intolerance) {
    setActiveList([...activeList, intolerance]);
    setFilteredIntolerance(
      filteredIntolerance.filter((item) => item.id !== intolerance.id)
    );
    if (!completelyNewSearch) {
      setEditedIntolerances(
        editedIntolerances.filter((item) => item.id !== intolerance.id)
      );
    }
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
  }

  function removeFromActive(intolerance) {
    if (!completelyNewSearch) {
      setFilteredIntolerance([...filteredIntolerance, intolerance]);
    }
    setActiveList(activeList.filter((item) => item !== intolerance));
    if (!completelyNewSearch) {
      setEditedIntolerances([intolerance, ...editedIntolerances]);
    }
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
  }

  return (
    <>
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
    </>
  );
}

const StyledActiveIntolerance = styled.button`
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

const StyledSearchResult = styled.button`
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
