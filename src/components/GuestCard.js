import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import emptyCircle from "../assets/icons/circle_empty.svg";
import checkedCircle from "../assets/icons/circle-check.svg";
import detailIcon from "../assets/icons/more-menu-vertical.svg";

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
        {selected === true ? (
          <img src={checkedCircle} alt="selected" />
        ) : (
          <img src={emptyCircle} alt="unselected" />
        )}
      </StyledCheckButton>
      <p>{name}</p>
      <StyledDetailsButton onClick={() => navigate(`/details/${id}`)}>
        <img src={detailIcon} alt="details" />
      </StyledDetailsButton>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin: 10px auto;
  max-width: 80%;
  text-align: left;
  background-color: var(--secondary-color);
  border-radius: 35px;

  p {
    display: inline;
    margin-left: 20px;
    word-wrap: break-word;
    font-size: 1.3rem;
  }

  input {
    margin-left: 20px;
  }
`;

const StyledDetailsButton = styled.button`
  justify-self: flex-end;
  margin-left: auto;
  margin-right: 20px;
  background-color: transparent;
  border: unset;

  img {
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
`;

const StyledCheckButton = styled.button`
  margin-left: 20px;
  margin-top: 5px;
  padding: 0;
  background-color: transparent;
  border: unset;

  img {
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;
