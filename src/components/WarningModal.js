import { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

export default function WarningModal() {
  const {
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    handleLogout,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteUser,
  } = useContext(UserContext);

  const modalRef = useRef();

  useEffect(() => {
    const handleTabKey = (e) => {
      const focusableModalElements =
        modalRef.current?.querySelectorAll("button");
      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];
      let isButtonfocused = false;
      for (let i = 0; i <= focusableModalElements.length; i++) {
        if (focusableModalElements[i] === document.activeElement) {
          isButtonfocused = true;
        }
      }
      if (!isButtonfocused) {
        firstElement.focus();
      }

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        return e.preventDefault();
      }
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        return e.preventDefault();
      }
    };

    function keyListener(e) {
      if (e.keyCode === 27) {
        isLogoutModalOpen
          ? setIsLogoutModalOpen(false)
          : setIsDeleteModalOpen(false);
      } else if (e.keyCode === 9 || e.keyCode === "Tab") {
        (isLogoutModalOpen || isDeleteModalOpen) && handleTabKey(e);
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  return (
    <>
      {(isLogoutModalOpen || isDeleteModalOpen) && (
        <StyledContainer onClick={() => setIsLogoutModalOpen(false)} />
      )}
      {(isLogoutModalOpen || isDeleteModalOpen) && (
        <DivCentered>
          <DivModal ref={modalRef}>
            <DivModalHeader>
              {isLogoutModalOpen && (
                <StyledModalHeader>Before you go</StyledModalHeader>
              )}
              {isDeleteModalOpen && (
                <StyledModalHeader>Delete account</StyledModalHeader>
              )}
            </DivModalHeader>
            <StyledCloseButton
              onClick={() =>
                isLogoutModalOpen
                  ? setIsLogoutModalOpen(false)
                  : setIsDeleteModalOpen(false)
              }
            >
              X
            </StyledCloseButton>
            <DivModalContent>
              {isLogoutModalOpen && (
                <p>Do you want to save your changes before you logout?</p>
              )}
              {isDeleteModalOpen && (
                <p>
                  Are you sure you want to delete this user? This cannot be
                  undone.
                </p>
              )}
            </DivModalContent>
            {isLogoutModalOpen && (
              <DivModalActionsContainer>
                <StyledPrimaryButton onClick={() => handleLogout("save")}>
                  Save & Logout
                </StyledPrimaryButton>
                <StyledSecondaryButton onClick={() => handleLogout("noSave")}>
                  Logout
                </StyledSecondaryButton>
              </DivModalActionsContainer>
            )}
            {isDeleteModalOpen && (
              <DivModalActionsContainer>
                <StyledPrimaryButton onClick={() => handleDeleteUser(true)}>
                  Delete
                </StyledPrimaryButton>
                <StyledSecondaryButton
                  isDelete={true}
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Back
                </StyledSecondaryButton>
              </DivModalActionsContainer>
            )}
          </DivModal>
        </DivCentered>
      )}
    </>
  );
}

const StyledContainer = styled.section`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 30;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const DivCentered = styled.div`
  position: fixed;
  width: 80%;
  z-index: 35;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DivModal = styled.div`
  background: white;
  color: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
`;

const DivModalHeader = styled.div`
  height: 50px;
  background: white;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const StyledModalHeader = styled.h5`
  margin: 0;
  padding: 10px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: #2c3e50;
  background: white;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 0;
  top: 0;
  align-self: flex-end;
  margin-top: -7px;
  margin-right: -7px;

  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }
`;

const DivModalContent = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #2c3e50;
  text-align: center;
`;

const DivModalActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
`;

const StyledPrimaryButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  background: var(--primary-color);
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 10px 20px -10px var(--primary-color);
    transform: translateY(-5px);
  }
`;

const StyledSecondaryButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: ${({ isDelete }) => (isDelete ? "black" : "red")};
  background-color: transparent;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: none;
    transform: none;
    background: whitesmoke;
  }
`;
