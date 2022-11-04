import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../util/UserContext";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";

export default function DisplaySelectedGuests() {
  const { guestArray } = useContext(UserContext);
  const selectedGuests = guestArray.filter((guest) => guest.selected);
  let intolerances = getIntolerances(guestArray);

  return (
    <>
      <StyledSubheader>
        {intolerances.length > 0
          ? "For"
          : "Go to your guestlist and choose guests you want to cook for!"}
      </StyledSubheader>
      <section>
        {selectedGuests.map((guest) => (
          <StyledGuestButton key={guest.id}>{guest.name}</StyledGuestButton>
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
