import ReactModal from "react-modal";
import styled from "styled-components";
import IntoleranceFilterInformation from "./IntoleranceFilterTable";

export default function InfoModal({ isModalOpen, setIsModalOpen }) {
  return (
    <ReactModal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
      <h2>Intolerance filters</h2>
      <StyledIntro>
        Find out what all the available filters for intolerances, diets, etc.
        mean exactly:
      </StyledIntro>
      <IntoleranceFilterInformation />
      <StyledCloseButton onClick={() => setIsModalOpen(false)}>
        X
      </StyledCloseButton>
    </ReactModal>
  );
}

const StyledCloseButton = styled.button`
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIntro = styled.p`
  margin: 10px 0;
`;
