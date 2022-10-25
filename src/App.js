import styled from "styled-components";

function App() {
  return (
    <Container>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <h2>Welcome!</h2>
      <p>Soon you will see your guest list here!</p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 450px;
  min-width: 320px;
`;

const StyledHeader = styled.header`
  background-color: var(--header-color-bg);
  font-family: var(--header-font);
  font-size: 2rem;
  margin-bottom: 20px;
  padding: 10px;
`;

export default App;
