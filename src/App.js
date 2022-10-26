import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import EditGuest from "./pages/EditGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import GuestDetails from "./pages/GuestDetails";
import { UserContext } from "./util/UserContext";

const testArray = [
  { id: nanoid(), name: "John", notes: "Likes his coffee black" },
  { id: nanoid(), name: "Anna", notes: "Doesn't like cucumber." },
];

function App() {
  const [guestArray, setGuestArray] = useState(testArray);
  const navigate = useNavigate();

  function createGuest(newName, newNotes) {
    setGuestArray([
      { id: nanoid(), name: newName, notes: newNotes },
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
