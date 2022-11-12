import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import EditGuest from "./pages/EditGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { UserContext } from "./util/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Recipes from "./pages/Recipes";
import FavoriteRecipes from "./pages/FavoriteRecipes";

function App() {
  const [storedGuests, setStoredGuests] = useLocalStorage(
    "cookingGuestList",
    []
  );
  const [storedFavorites, setStoredFavorites] = useLocalStorage(
    "favoriteRecipeList",
    []
  );
  const [guestArray, setGuestArray] = useState(storedGuests);
  const [favoriteArray, setFavoriteArray] = useState(storedFavorites);
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    setStoredGuests(guestArray);
  }, [guestArray]);

  useEffect(() => {
    setStoredFavorites(favoriteArray);
  }, [favoriteArray]);

  //Basic CRUD-Operations, used on CreateGuest.js and EditGuest.js
  function createGuest(newName, intolerancesArray, newNotes) {
    setGuestArray([
      {
        _id: nanoid(),
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
        handleLogout,
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
