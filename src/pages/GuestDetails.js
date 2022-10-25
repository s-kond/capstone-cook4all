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
        <h2>{name}</h2>
      </StyledHeader>
      <h3>Notes</h3>
      <StyledNotes>{notes}</StyledNotes>
      <button onClick={() => onDelete(id)}>delete guest</button>
      <button onClick={() => navigate("/")}>back</button>
    </>
  );
}

const StyledNotes = styled.p`
  margin: 20px auto;
`;
