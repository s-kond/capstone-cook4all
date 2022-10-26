import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../util/UserContext";
import { StyledHeader } from "./Home";
import styled from "styled-components";

export default function GuestDetails({ onDelete }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, notes } = guestDetails[0];

  return (
    <>
      <StyledHeader>
        <h2>Details</h2>
      </StyledHeader>
      <StyledSection>
        <StyledName>{name}</StyledName>
        <h3>Further Notes:</h3>
        <StyledNotes>{notes}</StyledNotes>
      </StyledSection>
      <button onClick={() => onDelete(id)}>delete guest</button>
      <button onClick={() => navigate("/")}>back</button>
    </>
  );
}

const StyledNotes = styled.p`
  margin: 10px auto;
`;

const StyledSection = styled.section`
  text-align: left;
  margin-bottom: 20px;
`;

const StyledName = styled.h2`
  margin-bottom: 20px;
  text-decoration: underline;
`;
