import styled from "styled-components";

export default function Home() {
  return (
    <>
      <StyledHeader>
        <h1>Cook4All</h1>
      </StyledHeader>
      <h2>Welcome!</h2>
      <p>Soon you will see your guest list here!</p>
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
