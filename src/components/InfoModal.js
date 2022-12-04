import styled from "styled-components";
import { useContext, useEffect } from "react";
import IntoleranceFilterInformation from "./IntoleranceFilterTable";
import { UserContext } from "../context/UserContext";

export default function InfoModal() {
  const { isInfoModalOpen, toggleModal } = useContext(UserContext);
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        toggleModal("info");
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  return (
    <>
      {isInfoModalOpen && (
        <Backdrop onClick={(event) => toggleModal("info", event)}></Backdrop>
      )}
      {isInfoModalOpen && (
        <ModalContainer onClick={(event) => toggleModal("info", event)}>
          <h2>Intolerance filters</h2>
          <StyledIntro>
            Find out what all the available filters for intolerances, diets,
            etc. mean exactly:
          </StyledIntro>
          <IntoleranceFilterInformation />
          {
            <StyledCloseButton onClick={(event) => toggleModal("info", event)}>
              X
            </StyledCloseButton>
          }
        </ModalContainer>
      )}
    </>
  );
}

const Backdrop = styled.div`
  height: 150vh;
  width: 100vw;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.section`
  width: 95%;
  height: 90%;
  position: fixed;
  overflow: scroll;
  padding: 15px;
  z-index: 150;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
`;

const StyledCloseButton = styled.button`
  position: fixed;
  top: 5px;
  right: 5px;
  padding: 5px 10px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIntro = styled.p`
  margin: 10px 0;
  font-size: 1.1rem;
`;
