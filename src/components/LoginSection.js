import { useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";

export default function LoginSection() {
  const {
    fetchGuestList,
    username,
    setUsername,
    isLoggedIn,
    isChanges,
    handleLogout,
    handleUserDataUpdate,
    handleNewUser,
  } = useContext(UserContext);
  return (
    <>
      {isLoggedIn && <p>Hello {username}!</p>}
      {isLoggedIn && (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
      {isLoggedIn && isChanges && (
        <button type="button" onClick={handleUserDataUpdate}>
          Save changes
        </button>
      )}
      {!isLoggedIn && (
        <StyledUsernameInput
          name="username"
          id="username"
          type="text"
          //this pattern prevents users from submiting empty whitespace-filled names (from stackoverflow)
          pattern=".*[^\s]{1,}.*"
          title="max. 15 letters, no empty usernames"
          placeholder="your username"
          minLength="1"
          maxLength="15"
          onChange={(event) => setUsername(event.target.value.trim())}
        />
      )}
      {!isLoggedIn && (
        <button type="button" onClick={fetchGuestList}>
          Login
        </button>
      )}
      {!isLoggedIn && (
        <button type="button" onClick={handleNewUser}>
          Login as new user
        </button>
      )}
    </>
  );
}

const StyledUsernameInput = styled.input`
  &:invalid {
    border: 2px solid red;
  }
`;
