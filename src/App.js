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

function App() {
  const [guestArray, setGuestArray] = useState([]);
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [changesCounter, setChangesCounter] = useState(0);
  const navigate = useNavigate();

  //handling GET-/POST-/PUT-Requests
  async function fetchUserData() {
    try {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setFavoriteArray(data.favoriteRecipes);
        setGuestArray(data.guestList);
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert(`Sorry, username "${username}" doesn't exist.`);
      console.error(error.message);
    }
  }

  async function handleNewUser() {
    const newUser = {
      name: username,
      guestList: guestArray,
      favoriteRecipes: favoriteArray,
    };
    const response = await fetch(`/api/users/addNew`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      alert(
        "This user already exists or you submitted an empty username. Please try again!"
      );
      console.error(json.error);
    }
    if (response.ok) {
      setIsLoggedIn(true);
    }
  }

  async function handleDeleteUser(confirmation) {
    setIsDeleteModalOpen(true);
    if (confirmation === true) {
      const response = await fetch(`/api/users/${username}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        setIsDeleteModalOpen(false);
        setIsProfileMenuOpen(false);
        handleLogout();
      }
      if (!response.ok) {
        console.error(json.error);
      }
    }
  }

  function handleLogout(saveChanges) {
    if (changesCounter > 0) {
      setIsLogoutModalOpen(true);
    }
    if (saveChanges === "save") {
      setIsLogoutModalOpen(false);
      handleUserDataUpdate();
      setIsLoggedIn(false);
      setGuestArray([]);
      setFavoriteArray([]);
    }
    if (saveChanges === "noSave") {
      setIsLogoutModalOpen(false);
      setChangesCounter(0);
      setGuestArray([]);
      setFavoriteArray([]);
      setIsLoggedIn(false);
    }
    if (changesCounter === 0) {
      setIsLoggedIn(false);
      setGuestArray([]);
      setFavoriteArray([]);
    }
  }

  async function handleUserDataUpdate() {
    const updates = {
      guestList: guestArray,
      favoriteRecipes: favoriteArray,
    };
    const response = await fetch(`/api/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.error(json.error);
    }
    if (response.ok) {
      setChangesCounter(0);
    }
  }

  //Basic CRUD-Operations, used on CreateGuest.js and EditGuest.js
  async function createGuest(newName, intolerancesArray, newNotes) {
    const newGuestArray = [
      {
        name: newName,
        intolerances: intolerancesArray,
        notes: newNotes,
        selected: false,
      },
      ...guestArray,
    ];
    //it's necessary to save the new guest to the db, so that an _id is generated directly:
    const response = await fetch(`/api/users/addGuest/${username}`, {
      method: "PUT",
      body: JSON.stringify({ guestList: newGuestArray }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.error(json.error);
    }
    //fetch the newly created guest from db and save him in guestArray:
    try {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setGuestArray(data.guestList);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function deleteGuest(guestId) {
    setGuestArray(guestArray.filter((guest) => guest._id !== guestId));
    navigate("/");
    setChangesCounter(changesCounter + 1);
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
    setChangesCounter(changesCounter + 1);
  }

  return (
    <UserContext.Provider
      value={{
        guestArray,
        setGuestArray,
        favoriteArray,
        setFavoriteArray,
        deleteGuest,
        fetchUserData,
        username,
        setUsername,
        isLoggedIn,
        changesCounter,
        setChangesCounter,
        handleLogout,
        handleUserDataUpdate,
        handleNewUser,
        handleDeleteUser,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        isProfileMenuOpen,
        setIsProfileMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="favorites" element={<FavoriteRecipes />} />
          <Route
            path="create-guest"
            element={<CreateGuest createGuest={createGuest} />}
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
