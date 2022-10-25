import styled from "styled-components";

export default function Button({ children, type = "button", ...props }) {
  return (
    <StyledButton type={type} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 0.5em 1em;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  background: #fae;
  color: #000;
  font-size: 1em;
  &:hover {
    background: #d8b;
  }
  &:active {
    background: #bad;
  }
`;