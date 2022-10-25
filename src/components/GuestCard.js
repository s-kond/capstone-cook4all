import styled from "styled-components";

export default function GuestCard({ personalData }) {
  const { name } = personalData;
  return (
    <StyledArticle>
      <input type="checkbox" />
      <p>{name}</p>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: flex;
  padding: 10px;
  margin: 10px auto;
  max-width: 80%;
  text-align: left;
  background-color: var(--header-color-bg);
  border-radius: 35px;

  p {
    display: inline;
    margin-left: 20px;
  }

  input {
    margin-left: 20px;
  }
`;
