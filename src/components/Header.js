import styled from "styled-components";

export default function Header({ title }) {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: var(--primary-color);
  font-family: var(--header-font);
  font-size: 2rem;
  height: 90px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: unset;
  }
`;
