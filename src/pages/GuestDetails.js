import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../util/UserContext";
import { StyledHeader } from "./Home";
import styled from "styled-components";
import editIcon from "../assets/icons/edit-line.svg";

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
          <img src={editIcon} alt="edit guest" />
        </StyledEditButton>
        <StyledName>{name}</StyledName>
        <h3>Food should be:</h3>
        <StyledList>
          {intolerances.map((item) => (
            <li key={item.id}>{item.name}</li>
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
  word-wrap: break-word;
`;

const StyledSection = styled.section`
  text-align: left;
  position: relative;
  margin-bottom: 20px;
  margin-left: 30px;
`;

const StyledName = styled.h2`
  margin-bottom: 20px;
  text-decoration: underline;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: unset;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledList = styled.ul`
  margin-bottom: 20px;
`;
