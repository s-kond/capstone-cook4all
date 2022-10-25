import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <StyledMain>
        <h2>Welcome!</h2>
        <p>Soon you will see your guest list here!</p>
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

const StyledMain = styled.main`
  p {
    margin: 20px auto;
  }
`;
