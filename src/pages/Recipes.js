import { StyledHeader } from "./Home";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";

export default function Recipes() {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const selectedGuests = guestArray.filter((guest) => guest.selected);
  const intolerances = getIntolerances();

  function getIntolerances() {
    let intolerancesObjects = [];
    const selectedGuestsIntolerances = guestArray
      .filter((guest) => guest.selected)
      .map((guest) => guest.intolerances);

    for (let item of selectedGuestsIntolerances) {
      intolerancesObjects = [...item, ...intolerancesObjects];
    }
    const intolerancesNames = intolerancesObjects
      .map((item) => item.name)
      .reduce(function (acc, curr) {
        if (!acc.includes(curr)) acc.push(curr);
        return acc;
      }, []);
    return intolerancesNames;
  }
  return (
    <>
      <StyledHeader>
        <h2>Recipes</h2>
      </StyledHeader>
      <StyledSubheader>For</StyledSubheader>
      <div>
        {selectedGuests.map((guest) => (
          <StyledP key={guest.id}> {guest.name}</StyledP>
        ))}
      </div>
      <StyledSubheader>Food should be:</StyledSubheader>
      <StyledSection>
        {intolerances.map((item) => (
          <span key={item}> {item}</span>
        ))}
      </StyledSection>
      <button onClick={() => navigate("/")}>back</button>
    </>
  );
}

const StyledP = styled.p`
  display: inline;
  background-color: var(--primary-color);
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
`;

const StyledSubheader = styled.h3`
  margin: 20px auto 10px auto;
`;

const StyledSection = styled.section`
  margin-bottom: 10px;
  span {
    margin: 10px;
  }
`;
