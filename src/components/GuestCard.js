import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function GuestCard({ personalData }) {
  const { name, id } = personalData;
  const navigate = useNavigate();
  return (
    <StyledArticle>
      <input type="checkbox" />
      <p>{name}</p>
      <button onClick={() => navigate(`/details/${id}`)}>details</button>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  display: flex;
  justify-content: flex-start;
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

  button {
    justify-self: flex-end;
    margin-left: auto;
    margin-right: 20px;
  }
`;
