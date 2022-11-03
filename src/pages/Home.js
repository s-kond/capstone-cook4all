import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import NavBar from "../components/NavBar";
import addIcon from "../assets/icons/add-circle-20-regular.svg";

export default function Home() {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);

  return (
    <>
      <StyledHeader>
        <h1>cook4all</h1>
      </StyledHeader>
      <main>
        <h2>Welcome!</h2>
        <WelcomeMessage>
          {guestArray.length > 0
            ? "Who do you want to cook for today?"
            : "Nobody here... Start by clicking + and add new guests!"}
        </WelcomeMessage>
        <section>
          {guestArray.map((guest) => {
            return <GuestCard key={guest.id} personalData={guest} />;
          })}
        </section>
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

export const StyledHeader = styled.header`
  background-color: var(--primary-color);
  font-family: var(--header-font);
  font-size: 2rem;
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomeMessage = styled.p`
  margin: 20px auto;
`;

const StyledAddButton = styled.button`
  background-color: transparent;
  border: unset;
  margin-bottom: 100px;

  img {
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`;
