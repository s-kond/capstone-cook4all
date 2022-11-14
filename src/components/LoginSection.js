import { useContext } from "react";
import { UserContext } from "../util/UserContext";

export default function LoginSection() {
  const {
    fetchGuestList,
    username,
    setUsername,
    isLoggedIn,
    isChanges,
    handleLogout,
    handleUserDataUpdate,
  } = useContext(UserContext);
  return (
    <>
      {isLoggedIn && <p>Hello {username}!</p>}
      {isLoggedIn && (
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      )}
      {isLoggedIn && isChanges && (
        <button type="button" onClick={() => handleUserDataUpdate()}>
          Save changes
        </button>
      )}
      {!isLoggedIn && (
        <input
          name="username"
          id="username"
          type="text"
          //this pattern prevents users from submiting empty whitespace-filled names (from stackoverflow)
          pattern=".*[^\s]{1,}.*"
          placeholder="your username"
          onChange={(event) => setUsername(event.target.value)}
        />
      )}
      {!isLoggedIn && (
        <button type="button" onClick={() => fetchGuestList()}>
          Login
        </button>
      )}
    </>
  );
}
