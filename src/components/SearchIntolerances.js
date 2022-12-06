import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { search } from "fast-fuzzy";
import { possibleIntolerances } from "../assets/data";
import infoIcon from "../assets/icons/info-regular.svg";
import compareArrays from "../util/CompareArrays";
import InfoModal from "./InfoModal";
import { UserContext } from "../context/UserContext";

export default function SearchIntolerances({
  completelyNewSearch,
  activeList,
  setActiveList,
}) {
  //completelyNewSearch zeigt an, ob dieses Modul auf der CreateGuest page (true) oder der EditGuest page (false) verwendet wird
  //filteredIntolerances werden als Vorschläge für den User gerendert, während er etwas in die Suche eintippt
  //editedIntolerances werden intern verwendet, wenn es schon vorausgewählte Intolerances auf der EditGuest page gibt

  const { toggleModal, isInfoModalOpen } = useContext(UserContext);
  const [filteredIntolerances, setFilteredIntolerances] = useState([]);
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
    setFilteredIntolerances(compareArrays(activeList, results));
  }

  function addToActive(intolerance) {
    setActiveList([...activeList, intolerance]);
    setFilteredIntolerances(
      filteredIntolerances.filter((item) => item.id !== intolerance.id)
    );
    if (!completelyNewSearch) {
      setEditedIntolerances(
        editedIntolerances.filter((item) => item.id !== intolerance.id)
      );
    }
    setFilteredIntolerances([]);
    intolerancesRef.current.value = "";
    intolerancesRef.current.focus();
  }

  function removeFromActive(intolerance) {
    if (!completelyNewSearch) {
      setFilteredIntolerances([...filteredIntolerances, intolerance]);
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
      {isInfoModalOpen && <InfoModal />}
      <label htmlFor="newIntolerances">Food should be</label>
      <StyledUl>
        {activeList.map((item) => (
          <li
            key={item.id}
            role="button"
            onClick={() => removeFromActive(item)}
            onKeyDown={() => removeFromActive(item)}
          >
            <StyledActiveIntolerance type="button">
              {item.name}
            </StyledActiveIntolerance>
          </li>
        ))}
      </StyledUl>
      <StyledInputSection>
        <input
          name="newIntolerances"
          id="newIntolerances"
          type="text"
          placeholder="e.g. fish-free"
          ref={intolerancesRef}
          onChange={(event) => searchIntolerance(event.target.value)}
        />
        <StyledInfoButton
          type="button"
          title="intolerances, diets, ..."
          onClick={() => toggleModal("info")}
        >
          <img src={infoIcon} alt="more information" />
        </StyledInfoButton>
      </StyledInputSection>
      <section>
        {filteredIntolerances.map((item) => (
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
  background-color: transparent;
  margin-bottom: 5px;
  width: 150px;
  text-align: left;
  border: unset;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  list-style: "x";
`;

const StyledSearchResult = styled.button`
  background-color: var(--secondary-color);
  margin-bottom: 10px;
  margin-right: 5px;
  padding: 8px;
  border: unset;
  border-radius: 35px;
  cursor: pointer;
`;

const StyledInputSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  input {
    margin-left: 0;
  }
`;

const StyledInfoButton = styled.button`
  background-color: transparent;
  margin: auto auto auto 15px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: unset;
  img {
    height: 25px;
    width: 25px;
  }
`;
