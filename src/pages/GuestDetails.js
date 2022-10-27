import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../util/UserContext";
import { StyledHeader } from "./Home";
import styled from "styled-components";
import { nanoid } from "nanoid";

export default function GuestDetails({ onDelete }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  const { id } = useParams();
  const guestDetails = guestArray.filter((guest) => guest.id === id);
  const { name, intolerances, notes } = guestDetails[0];

  return (
    <>
      <StyledHeader>
        <h2>Details</h2>
      </StyledHeader>
      <StyledSection>
        <StyledEditButton onClick={() => navigate(`/edit-guest/${id}`)}>
          Edit
        </StyledEditButton>
        <StyledName>{name}</StyledName>
        <h3>Food should be:</h3>
        <StyledList>
          {intolerances.map((item) => (
            <li key={nanoid()}>{item}</li>
          ))}
        </StyledList>
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
  position: relative;
  margin-bottom: 20px;
`;

const StyledName = styled.h2`
  margin-bottom: 20px;
  text-decoration: underline;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledList = styled.ul`
  margin-bottom: 20px;
`;
