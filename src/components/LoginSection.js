import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

export default function LoginSection() {
  const { fetchUserData, username, setUsername, isLoggedIn, handleNewUser } =
    useContext(UserContext);
  return (
    <LoginContainer>
      {isLoggedIn && <h2>Hello {username}!</h2>}
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
        <button type="button" onClick={fetchUserData}>
          Login
        </button>
      )}
      {!isLoggedIn && (
        <button type="button" onClick={handleNewUser}>
          Login as new user
        </button>
      )}
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  height: 80%;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    padding: 10px 0;
    font-size: 1.1rem;
    border-radius: 15px;
    border: unset;
    box-shadow: 1px 1px 2px;
    background-color: var(--primary-color);
    cursor: pointer;

    &:last-of-type {
      font-size: 1rem;
      background-color: transparent;
    }
    &:hover {
      background-color: lightgrey;
    }
  }
`;

const StyledUsernameInput = styled.input`
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: text;

  &:invalid {
    border: 2px solid red;
  }
`;
