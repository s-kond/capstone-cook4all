import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function Home({ handleSubmit }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form.elements);
    const { Anna } = form.elements;
    console.log(Anna);
    handleSubmit();
  }

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
        <form onSubmit={onSubmit}>
          {guestArray.map((guest) => {
            return <GuestCard key={guest.id} personalData={guest} />;
          })}
          <button type="button" onClick={() => navigate("/create-guest")}>
            +
          </button>
          <StyledSubmitButton type="submit">Show recipes</StyledSubmitButton>
        </form>
      </main>
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

const StyledSubmitButton = styled.button`
  display: block;
  margin: 20px auto;
`;
