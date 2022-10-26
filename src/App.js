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
    intolerances: ["dairy-free", "gluten-free"],
    notes: "Likes his coffee black",
  },
  {
    id: nanoid(),
    name: "Anna",
    intolerances: ["kosher"],
    notes: "Doesn't like cucumber.",
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

  function createGuest(newName, newNotes, intolerancesArray) {
    setGuestArray([
      {
        id: nanoid(),
        name: newName,
        intolerances: intolerancesArray,
        notes: newNotes,
      },
      ...guestArray,
    ]);
  }

  function deleteGuest(guestId) {
    setGuestArray(guestArray.filter((guest) => guest.id !== guestId));
    navigate("/");
  }

  function editGuest(guestId, newName, newNotes) {
    let editedArray = guestArray.map((guest) =>
      guest.id === guestId
        ? { ...guest, name: newName, notes: newNotes }
        : guest
    );
    setGuestArray(editedArray);
  }

  return (
    <UserContext.Provider value={{ guestArray }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
