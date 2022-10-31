import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function GuestCard({ personalData }) {
  const { name, id, selected } = personalData;
  const navigate = useNavigate();

  const { guestArray, setGuestArray } = useContext(UserContext);

  function toggleSelected(guestId) {
    setGuestArray(
      guestArray.map((guest) =>
        guest.id === guestId
          ? {
              ...guest,
              selected: !guest.selected,
            }
          : guest
      )
    );
  }

  return (
    <StyledArticle>
      <StyledCheckButton type="button" onClick={() => toggleSelected(id)}>
        {selected === true ? "On" : "Off"}
      </StyledCheckButton>
      <p>{name}</p>
      <StyledDetailsButton onClick={() => navigate(`/details/${id}`)}>
        details
      </StyledDetailsButton>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  margin: 10px auto;
  max-width: 80%;
  text-align: left;
  background-color: var(--primary-color);
  border-radius: 35px;

  p {
    display: inline;
    margin-left: 20px;
    word-wrap: break-word;
  }

  input {
    margin-left: 20px;
  }
`;

const StyledDetailsButton = styled.button`
  justify-self: flex-end;
  margin-left: auto;
  margin-right: 20px;
`;

const StyledCheckButton = styled.button`
  margin-left: 20px;
`;
