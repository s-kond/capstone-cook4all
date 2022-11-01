import { StyledHeader } from "./Home";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";
import NavBar from "../components/NavBar";

export default function Recipes() {
  const { guestArray, setGuestArray } = useContext(UserContext);
  const selectedGuests = guestArray.filter((guest) => guest.selected);
  let intolerances = getIntolerances();

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

  function unselectGuest(id) {
    setGuestArray(
      guestArray.map((guest) =>
        guest.id === id
          ? {
              ...guest,
              selected: false,
            }
          : guest
      )
    );
    intolerances = getIntolerances();
  }

  return (
    <>
      <StyledHeader>
        <h2>Recipes</h2>
      </StyledHeader>
      <StyledSubheader>
        {intolerances.length > 0
          ? "For"
          : "Go to your guestlist and choose guests you want to cook for!"}
      </StyledSubheader>
      <section>
        {selectedGuests.map((guest) => (
          <StyledGuestButton
            key={guest.id}
            onClick={() => unselectGuest(guest.id)}
          >
            x {guest.name}
          </StyledGuestButton>
        ))}
      </section>
      <StyledSubheader>
        {intolerances.length > 0 ? "Food should be:" : ""}
      </StyledSubheader>
      <StyledSection>
        {intolerances.map((item) => (
          <span key={item}> {item}</span>
        ))}
      </StyledSection>
      <NavBar />
    </>
  );
}

const StyledGuestButton = styled.p`
  display: inline;
  background-color: transparent;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    background-color: rgba(236, 236, 236, 0.78);
  }
`;

const StyledSubheader = styled.h3`
  margin: 20px auto;

  &:last-of-type {
    margin: 30px auto 10px auto;
  }
`;

const StyledSection = styled.section`
  margin-bottom: 10px;
  span {
    margin: 10px;
  }
`;
