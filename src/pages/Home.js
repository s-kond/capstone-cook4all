import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";
import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function Home({ data }) {
  const navigate = useNavigate();
  const { guestArray } = useContext(UserContext);
  return (
    <>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <main>
        <h2>Welcome!</h2>
        <P1>
          {guestArray.length > 0
            ? "Who do you want to cook for today?"
            : "Nobody here... Start by clicking + and add new guests!"}
        </P1>
        <section>
          {guestArray.map((guest) => {
            return <GuestCard key={guest.id} personalData={guest} />;
          })}
        </section>
        <button onClick={() => navigate("/create-guest")}>+</button>
      </main>
    </>
  );
}

export const StyledHeader = styled.header`
  background-color: var(--header-color-bg);
  font-family: var(--header-font);
  font-size: 2rem;
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P1 = styled.p`
  margin: 20px auto;
`;
