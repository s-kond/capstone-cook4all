import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import EditGuest from "./pages/EditGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./util/UserContext";
import Recipes from "./pages/Recipes";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import { useEffect } from "react";

function App() {
  const [guestArray, setGuestArray] = useState([]);
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChanges, setIsChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsChanges(true);
  }, [guestArray]);

  async function fetchGuestList() {
    try {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setGuestArray([...guestArray, ...data[0].guestList]);
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert(`Sorry, username "${username}" doesn't exist.`);
      console.log(error.message);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setGuestArray([]);
  }

  async function handleUserDataUpdate() {
    const response = await fetch(`/api/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(guestArray),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setIsChanges(false);
    }
  }

  //Basic CRUD-Operations, used on CreateGuest.js and EditGuest.js
  function createGuest(newName, intolerancesArray, newNotes) {
    setGuestArray([
      {
        name: newName,
        intolerances: intolerancesArray,
        notes: newNotes,
        selected: false,
      },
      ...guestArray,
    ]);
  }

  function deleteGuest(guestId) {
    setGuestArray(guestArray.filter((guest) => guest._id !== guestId));
    navigate("/");
  }

  function editGuest(guestId, newName, newIntolerances, newNotes) {
    setGuestArray(
      guestArray.map((guest) =>
        guest._id === guestId
          ? {
              ...guest,
              name: newName,
              intolerances: newIntolerances,
              notes: newNotes,
              selected: false,
            }
          : guest
      )
    );
  }

  return (
    <UserContext.Provider
      value={{
        guestArray,
        setGuestArray,
        favoriteArray,
        setFavoriteArray,
        deleteGuest,
        fetchGuestList,
        username,
        setUsername,
        isLoggedIn,
        isChanges,
        setIsChanges,
        handleLogout,
        handleUserDataUpdate,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="favorites" element={<FavoriteRecipes />} />
          <Route
            path="create-guest"
            element={<CreateGuest onHandleSubmit={createGuest} />}
          />
          <Route
            path="edit-guest/:id"
            element={<EditGuest onHandleEditSubmit={editGuest} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
