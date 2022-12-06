import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import emptyCircle from "../assets/icons/circle_empty.svg";
import checkedCircle from "../assets/icons/circle-check.svg";
import detailIcon from "../assets/icons/more-menu-vertical.svg";
import editIcon from "../assets/icons/edit-line.svg";
import deleteIcon from "../assets/icons/delete-icon.svg";

export default function GuestCard({ personalData }) {
  const { name, intolerances, notes, _id, selected } = personalData;
  const [showGuestInfo, setShowGuestInfo] = useState(false);
  const navigate = useNavigate();
  const { toggleSelectGuest, deleteGuest } = useContext(UserContext);
  return (
    <StyledArticle>
      <StyledBasicSection>
        <StyledCheckButton type="button" onClick={() => toggleSelectGuest(_id)}>
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
          <StyledDeleteButton onClick={() => deleteGuest(_id)}>
            <img src={deleteIcon} alt="delete guest" />
            <p>delete</p>
          </StyledDeleteButton>
          <StyledEditButton onClick={() => navigate(`/edit-guest/${_id}`)}>
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
  min-width: 300px;
  max-width: 80%;
  text-align: left;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 35px;
  animation: wiggle 0.5s;

  input {
    margin-left: 20px;
  }

  @keyframes wiggle {
    0% {
      transform: rotateY(-80deg);
    }
    100% {
      transform: rotateY(0deg);
    }
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
  word-break: break-all;
  hyphens: auto;
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
  word-break: break-all;
  hyphens: auto;
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
