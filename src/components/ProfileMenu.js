import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  setIsModalOpen,
}) {
  const { isLoggedIn, isChanges, handleUserDataUpdate, handleLogout } =
    useContext(UserContext);
  const navigate = useNavigate();

  function goToLogin() {
    setIsProfileMenuOpen(false);
    navigate("/");
  }

  function handleLogoutAndClose() {
    setIsProfileMenuOpen(false);
    navigate("/");
    handleLogout();
  }

  return (
    <>
      {isProfileMenuOpen && (
        <ButtonContainer>
          {!isLoggedIn && <button onClick={goToLogin}>Login</button>}
          {isLoggedIn && (
            <LogoutButton type="button" onClick={handleLogoutAndClose}>
              Logout
            </LogoutButton>
          )}
          <button
            type="button"
            title="intolerances, diets, ..."
            onClick={() => setIsModalOpen(true)}
          >
            Information
          </button>
          {isLoggedIn && isChanges && (
            <button type="button" onClick={handleUserDataUpdate}>
              Save changes !
            </button>
          )}
        </ButtonContainer>
      )}
    </>
  );
}

const ButtonContainer = styled.div`
  position: absolute;
  top: -200px;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  height: 200px;
  background-color: transparent;
  width: 25%;

  @media (max-width: 600px) {
    width: 35%;
  }

  button {
    font-size: 1.1rem;
    width: 100%;
    height: 2.5rem;
    border: unset;
    background-color: var(--primary-color);
    border-bottom: 1px solid black;
    cursor: pointer;
    &:hover {
      background-color: whitesmoke;
    }
  }
`;

const LogoutButton = styled.button`
  color: red;
`;
