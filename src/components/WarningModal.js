import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../util/UserContext";

export default function WarningModal() {
  const {
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    handleLogout,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteUser,
  } = useContext(UserContext);

  return (
    <>
      {(isLogoutModalOpen || isDeleteModalOpen) && (
        <StyledContainer onClick={() => setIsLogoutModalOpen(false)} />
      )}
      {(isLogoutModalOpen || isDeleteModalOpen) && (
        <DivCentered>
          <DivModal>
            <DivModalHeader>
              {isLogoutModalOpen && (
                <StyledModalHeader>Before you go</StyledModalHeader>
              )}
              {isDeleteModalOpen && (
                <StyledModalHeader>Deleting account</StyledModalHeader>
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
                <p>
                  There are unsaved changes. They will be lost when you logout
                  now. Do you want to save those changes?
                </p>
              )}
              {isDeleteModalOpen && (
                <p>
                  Are you sure you want to delete this user? This cannot be
                  undone.
                </p>
              )}
            </DivModalContent>
            <DivModalActions>
              {isLogoutModalOpen && (
                <DivModalActionsContainer>
                  <StyledSaveButton onClick={() => handleLogout("save")}>
                    Save changes and logout
                  </StyledSaveButton>
                  <StyledLogoutButton onClick={() => handleLogout("noSave")}>
                    Logout
                  </StyledLogoutButton>
                </DivModalActionsContainer>
              )}
              {isDeleteModalOpen && (
                <DivModalActionsContainer>
                  <StyledSaveButton onClick={() => handleDeleteUser(true)}>
                    Delete
                  </StyledSaveButton>
                  <StyledLogoutButton
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Back
                  </StyledLogoutButton>
                </DivModalActionsContainer>
              )}
            </DivModalActions>
          </DivModal>
        </DivCentered>
      )}
    </>
  );
}

const StyledContainer = styled.section`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const DivCentered = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DivModal = styled.div`
  width: 400px;
  height: 400px;
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

const DivModalActions = styled.div`
  position: absolute;
  bottom: 2px;
  margin-bottom: 10px;
  width: 100%;
`;

const DivModalActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledSaveButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
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

const StyledLogoutButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: red;
  background-color: transparent;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: none;
    transform: none;
    background: whitesmoke;
  }
`;