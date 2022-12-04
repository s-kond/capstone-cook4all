import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/NavBar";
import addIcon from "../assets/icons/add-circle-20-regular.svg";
import Header from "../components/Header";
import LoginSection from "../components/LoginSection";

export default function Home() {
  const navigate = useNavigate();
  const { guestArray, isLoggedIn, username } = useContext(UserContext);

  return (
    <>
      <Header title="Cook4All" />
      <main>
        {isLoggedIn ? <h2>Welcome {username}!</h2> : <h2>Welcome!</h2>}
        <WelcomeMessage>
          {guestArray.length > 0
            ? "Who do you want to cook for today?"
            : isLoggedIn
            ? "Here you can add everyone you want to cook for:"
            : "Login to add new guests:"}
        </WelcomeMessage>
        {!isLoggedIn && <LoginSection />}
        <StyledGuestList>
          {guestArray.map((guest) => {
            return <GuestCard key={guest._id} personalData={guest} />;
          })}
        </StyledGuestList>
        {isLoggedIn && (
          <StyledAddButton
            type="button"
            onClick={() => navigate("/create-guest")}
          >
            <img src={addIcon} alt="Add guest" />
          </StyledAddButton>
        )}
      </main>
      <NavBar />
    </>
  );
}

const WelcomeMessage = styled.p`
  margin: 20px auto;
`;

const StyledGuestList = styled.section`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  border: unset;
  margin-top: 20px;
  margin-bottom: 100px;

  img {
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`;
