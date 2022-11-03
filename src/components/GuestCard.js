import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../util/UserContext";
import emptyCircle from "../assets/icons/circle_empty.svg";
import checkedCircle from "../assets/icons/circle-check.svg";
import detailIcon from "../assets/icons/more-menu-vertical.svg";
import editIcon from "../assets/icons/edit-line.svg";
import deleteIcon from "../assets/icons/delete-icon.svg";

export default function GuestCard({ personalData }) {
  const { name, intolerances, notes, id, selected } = personalData;
  const { deleteGuest } = useContext(UserContext);
  const [showGuestInfo, setShowGuestInfo] = useState(false);
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
      <StyledBasicSection>
        <StyledCheckButton type="button" onClick={() => toggleSelected(id)}>
          {selected ? (
            <img src={checkedCircle} alt="selected" />
          ) : (
            <img src={emptyCircle} alt="unselected" />
          )}
        </StyledCheckButton>
        <StyledName>{name}</StyledName>
        <StyledDetailsButton
          onClick={() => setShowGuestInfo(!showGuestInfo)}
          showGuestInfo={showGuestInfo}
        >
          <img src={detailIcon} alt="details" />
        </StyledDetailsButton>
      </StyledBasicSection>
      <StyledGuestInfoSection showGuestInfo={showGuestInfo}>
        <StyledInfoP>
          {intolerances.length > 0 && "Food should be:"}
        </StyledInfoP>
        <ul>
          {intolerances.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <StyledInfoP>{notes.length > 0 && "Further Notes:"}</StyledInfoP>
        <StyledNotes>{notes}</StyledNotes>
        <StyledButtonContainer>
          <StyledDeleteButton onClick={() => deleteGuest(id)}>
            <img src={deleteIcon} alt="delete guest" />
            <p>delete</p>
          </StyledDeleteButton>
          <StyledEditButton onClick={() => navigate(`/edit-guest/${id}`)}>
            <img src={editIcon} alt="edit guest" />
            <p>edit</p>
          </StyledEditButton>
        </StyledButtonContainer>
      </StyledGuestInfoSection>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 10px;
  margin: 10px auto;
  max-width: 80%;
  text-align: left;
  background-color: var(--secondary-color);
  border-radius: 35px;

  input {
    margin-left: 20px;
  }
`;

const StyledBasicSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledName = styled.p`
  display: inline;
  margin-left: 20px;
  word-wrap: break-word;
  font-size: 1.3rem;
`;

const StyledDetailsButton = styled.button`
  justify-self: flex-end;
  margin-left: auto;
  margin-right: 20px;
  background-color: transparent;
  border: unset;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  img {
    transform: ${({ showGuestInfo }) => showGuestInfo && "rotate(90deg)"};
  }
`;

const StyledCheckButton = styled.button`
  margin-left: 20px;
  margin-top: 5px;
  padding: 0;
  background-color: transparent;
  border: unset;
  cursor: pointer;
  img {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledGuestInfoSection = styled.section`
  padding-bottom: 20px;
  width: 100%;
  display: ${({ showGuestInfo }) => (showGuestInfo ? "unset" : "none")};
`;

const StyledInfoP = styled.p`
  margin: 20px 0 5px 20px;
  font-weight: bold;
`;

const StyledNotes = styled.p`
  margin-left: 20px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: space-evenly;

  button {
    border: unset;
    border-radius: 10px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledEditButton = styled.button``;
const StyledDeleteButton = styled.button`
  padding-top: 3px;
  p {
    margin-top: 2px;
  }
`;
