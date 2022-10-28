import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import EditGuest from "./pages/EditGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import GuestDetails from "./pages/GuestDetails";
import { UserContext } from "./util/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

const testArray = [
  {
    id: nanoid(),
    name: "John",
    intolerances: [
      { id: 5, name: "dairy-free" },
      { id: 10, name: "gluten-free" },
    ],
    notes: "Likes his coffee black",
    checked: false,
  },
  {
    id: nanoid(),
    name: "Anna",
    intolerances: [{ id: 14, name: "kosher" }],
    notes: "Doesn't like cucumber.",
    checked: false,
  },
];

function App() {
  const [storedValue, setStoredValue] = useLocalStorage(
    "cookingGuestList",
    testArray
  );
  const [guestArray, setGuestArray] = useState(storedValue);
  const navigate = useNavigate();

  useEffect(() => {
    setStoredValue(guestArray);
  }, [guestArray]);

  function setRecipeFilter() {
    console.log("works");
  }

  //Basic CRUD-Operations, used on CreateGuest.js and EditGuest.js
  function createGuest(newName, intolerancesArray, newNotes) {
    setGuestArray([
      {
        id: nanoid(),
        name: newName,
        intolerances: intolerancesArray,
        notes: newNotes,
        checked: false,
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
              checked: false,
            }
          : guest
      )
    );
  }

  return (
    <UserContext.Provider value={{ guestArray }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home handleSubmit={setRecipeFilter} />} />
          <Route
            path="create-guest"
            element={<CreateGuest onHandleSubmit={createGuest} />}
          />
          <Route
            path="/details/:id"
            element={<GuestDetails onDelete={deleteGuest} />}
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
