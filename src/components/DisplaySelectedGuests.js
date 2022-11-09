import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../util/UserContext";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";

export default function DisplaySelectedGuests() {
  const { guestArray } = useContext(UserContext);
  const selectedGuests = guestArray.filter((guest) => guest.selected);
  let intolerances = getIntolerances(guestArray);

  return (
    <StyledSection>
      <StyledSubheader>
        {intolerances.length > 0
          ? "Selected guests:"
          : "Go to your guestlist and choose guests you want to cook for!"}
      </StyledSubheader>
      <p>{selectedGuests.map((guest) => guest.name).join(", ")}</p>
      <StyledSubheader>
        {intolerances.length > 0 ? "Active search filter:" : null}
      </StyledSubheader>
      <StyledSubSection>
        {intolerances.map((item) => (
          <span key={item}> {item}</span>
        ))}
      </StyledSubSection>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  text-align: left;
  padding-left: 20px;
`;

const StyledSubheader = styled.h3`
  margin: 20px 0 5px 0;
`;

const StyledSubSection = styled.section`
  margin-bottom: 10px;
  span {
    margin-right: 10px;
  }
`;
