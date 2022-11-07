import ReactModal from "react-modal";
import styled from "styled-components";
import IntoleranceFilterInformation from "./IntoleranceFilterTable";

export default function InfoModal({ isModalOpen, setIsModalOpen }) {
  return (
    <ReactModal isOpen={isModalOpen}>
      <h2>Intolerance filters</h2>
      <StyledIntro>
        Find out what all the available filters for intolerances, diets, etc.
        mean exactly:
      </StyledIntro>
      <IntoleranceFilterInformation />
      <StyledCloseButton onClick={() => setIsModalOpen(false)}>
        Close
      </StyledCloseButton>
    </ReactModal>
  );
}

const StyledCloseButton = styled.button`
  margin-top: 20px;
  margin-left: 45%;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledIntro = styled.p`
  margin: 10px 0;
`;
