import styled from "styled-components";

function App() {
  return (
    <Container>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <p>Welcome!</p>
      <p>Soon you will see your guest list here!</p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 390px;
  min-width: 320px;
`;

const StyledHeader = styled.header`
  background-color: #dcedc1;
  font-family: var(--header-font);
  font-size: 2rem;
  margin-bottom: 20px;
  padding: 10px;
`;

export default App;
