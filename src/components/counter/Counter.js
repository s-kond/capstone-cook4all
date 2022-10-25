import { useState } from "react";
import styled from "styled-components";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <StyledSection>
      <h2>My counter</h2>
      <p>Current count: {count}</p>
      <button
        onClick={() => setCount((previous) => previous + 1)}
        type="button"
      >
        +
      </button>
      <button
        onClick={() => setCount((previous) => previous - 1)}
        type="button"
      >
        -
      </button>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  background-color: blue;
`;