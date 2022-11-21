import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/icons/ei_trash.svg";
import saveIcon from "../assets/icons/ic_round-save-alt.svg";
import infoIcon from "../assets/icons/info-regular.svg";
import logoutIcon from "../assets/icons/logout-outlined.svg";
import loginIcon from "../assets/icons/uiw_login.svg";

export default function ProfileMenu({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  setIsInfoModalOpen,
}) {
  const {
    isLoggedIn,
    changesCounter,
    handleUserDataUpdate,
    handleDeleteUser,
    handleLogout,
  } = useContext(UserContext);
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
        <MenuBackdrop onClick={() => setIsProfileMenuOpen(false)} />
      )}
      {isProfileMenuOpen && (
        <ButtonContainer>
          {!isLoggedIn && (
            <button onClick={goToLogin}>
              <p>Login</p>
              <img src={loginIcon} alt="go to login" />
            </button>
          )}
          {isLoggedIn && (
            <LogoutButton type="button" onClick={handleLogoutAndClose}>
              <p>Logout</p>
              <img src={logoutIcon} alt="delete" />
            </LogoutButton>
          )}
          {isLoggedIn && (
            <LogoutButton type="button" onClick={handleDeleteUser}>
              <p>Delete this account</p>
              <img src={deleteIcon} alt="delete" />
            </LogoutButton>
          )}
          <button
            type="button"
            title="intolerances, diets, ..."
            onClick={() => setIsInfoModalOpen(true)}
          >
            <p>Information</p>
            <img src={infoIcon} alt="delete" />
          </button>
          {isLoggedIn && changesCounter > 0 && (
            <button type="button" onClick={handleUserDataUpdate}>
              <ChangeIcon>{changesCounter}</ChangeIcon>
              <p>Save changes</p>
              <img src={saveIcon} alt="delete" />
            </button>
          )}
        </ButtonContainer>
      )}
    </>
  );
}

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 25;
  bottom: 90px;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 10px;
  height: 200px;
  background-color: transparent;
  width: 50%;
  min-width: 250px;
  max-width: 350px;

  button {
    font-size: 1.1rem;
    text-align: left;
    width: 100%;
    height: 2.5rem;
    padding: 5px 20px 5px 30px;
    border: unset;
    border-radius: 15px;
    background-color: var(--primary-color);
    box-shadow: 1px 1px 2px black;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 20px;
    }
    &:hover {
      background-color: whitesmoke;
    }
    &:last-of-type {
      position: relative;
    }
  }
`;

const LogoutButton = styled.button`
  color: red;
`;

const ChangeIcon = styled.p`
  position: absolute;
  top: -10px;
  left: -10px;
  padding: 3px 8px;
  border-radius: 50px;
  background-color: lightcoral;
  color: white;
`;

const MenuBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
`;
