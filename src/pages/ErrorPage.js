import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <StyledErrorPage>
      <h2>Upsy-daisy...</h2>
      <p>This URL seems to be invalid. Please return to home:</p>
      <button onClick={() => navigate("/home")}>Return</button>
    </StyledErrorPage>
  );
}

const StyledErrorPage = styled.section`
  h2 {
    margin: 20px auto;
  }

  p {
    margin-bottom: 12px;
  }

  button {
    font-size: 1.1rem;
  }
`;
