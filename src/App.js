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

const testArray = [
  {
    id: nanoid(),
    name: "John",
    intolerances: [
      { id: 5, name: "Dairy-Free" },
      { id: 10, name: "Gluten-Free" },
    ],
    notes: "Likes his coffee black",
    selected: false,
  },
  {
    id: nanoid(),
    name: "Anna",
    intolerances: [{ id: 14, name: "Kosher" }],
    notes: "Doesn't like cucumber.",
    selected: false,
  },
];

function App() {
  const [storedGuests, setStoredGuests] = useLocalStorage(
    "cookingGuestList",
    testArray
  );
  const [storedFavorites, setStoredFavorites] = useLocalStorage(
    "favoriteRecipeList",
    []
  );
  const [guestArray, setGuestArray] = useState(storedGuests);
  const [favoriteArray, setFavoriteArray] = useState(storedFavorites);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const response = await fetch("/api/users/636e0f416f9bb50da6915796");
        const data = await response.json();

        if (response.ok) {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGuestList();
  }, []);

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
        id: nanoid(),
        name: newName,
        intolerances: intolerancesArray,
        notes: newNotes,
        selected: false,
      },
      ...guestArray,
    ]);
  }

  function deleteGuest(guestId) {
    setGuestArray(guestArray.filter((guest) => guest.id !== guestId));
    navigate("/");
  }

  function editGuest(guestId, newName, newIntolerances, newNotes) {
    setGuestArray(
      guestArray.map((guest) =>
        guest.id === guestId
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
