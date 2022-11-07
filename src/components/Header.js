import styled from "styled-components";

export default function Header({ title }) {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
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
