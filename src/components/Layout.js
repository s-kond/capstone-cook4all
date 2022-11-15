import styled from "styled-components";
import LogoutModal from "./LogoutModal";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Container>
        <LogoutModal />
        <Outlet />
      </Container>
    </>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100vw;
  max-width: 1080px;
  min-width: 320px;
`;
