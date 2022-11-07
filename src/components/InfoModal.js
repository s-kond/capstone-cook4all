import ReactModal from "react-modal";
import styled from "styled-components";
import IntoleranceFilterInformation from "./IntoleranceFilterTable";

export default function InfoModal({ isModalOpen, setIsModalOpen }) {
  return (
    <ReactModal isOpen={isModalOpen}>
      <StyledCloseButton onClick={() => setIsModalOpen(false)}>
        close
      </StyledCloseButton>
      <h2>Intolerance filters</h2>
      <StyledIntro>
        Find out what all the available filters for intolerances, diets, etc.
        mean exactly:
      </StyledIntro>
      <IntoleranceFilterInformation />
    </ReactModal>
  );
}

const StyledCloseButton = styled.button`
  position: absolute;
  right: 20px;
  font-size: 1.2rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIntro = styled.p`
  margin: 10px 0;
`;
