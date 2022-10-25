import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";

function App() {
  const [state, setState] = useState({ topic: "" });

  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("/api/data-for-react");
      const data = await response.json();
      setState(data);
    }
  }, []);
  return (
    <Container>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Your React {state.topic} Template
        </AppLink>
      </AppHeader>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default App;
