import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import NavBar from "../components/NavBar";
import addIcon from "../assets/icons/add-circle-20-regular.svg";
import Header from "../components/Header";
import LoginSection from "../components/LoginSection";

export default function Home() {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);

  return (
    <>
      <Header title="cook4all" />
      <main>
        <h2>Welcome!</h2>
        <WelcomeMessage>
          {guestArray.length > 0
            ? "Who do you want to cook for today?"
            : "Nobody here... Login or add new guests!"}
        </WelcomeMessage>
        <LoginSection />
        <hr />
        <StyledGuestList>
          {guestArray.map((guest) => {
            //when you create a new guest, there is no guest.id that you could use as a key
            //every guest gets an id when you save the guestArray to the dataBase
            //(to prevent one guest having two ids)
            //that's the reason for this (temporary) math.random()-key:
            return (
              <GuestCard
                key={guest._id ?? Math.random().toString(36).substring(2)}
                personalData={guest}
              />
            );
          })}
        </StyledGuestList>
        <StyledAddButton
          type="button"
          onClick={() => navigate("/create-guest")}
        >
          <img src={addIcon} alt="Add guest" />
        </StyledAddButton>
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
