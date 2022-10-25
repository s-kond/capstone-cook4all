import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GuestCard from "../components/GuestCard";

export default function Home({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <StyledMain>
        <h2>Welcome!</h2>
        <P1>
          {data.length > 0
            ? "Who do you want to cook for today?"
            : "Nobody here... Start by clicking + and add new guests!"}
        </P1>
        <section>
          {data.map((guest) => {
            return <GuestCard key={guest.id} personalData={guest} />;
          })}
        </section>
        <button onClick={() => navigate("/create-guest")}>+</button>
      </StyledMain>
    </>
  );
}

const StyledHeader = styled.header`
  background-color: var(--header-color-bg);
  font-family: var(--header-font);
  font-size: 2rem;
  margin-bottom: 20px;
  padding: 10px;
`;

const P1 = styled.p`
  margin: 20px auto;
`;

const StyledMain = styled.main`
  button {
    margin-top: 20px;
  }
`;
