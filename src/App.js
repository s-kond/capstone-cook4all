import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import GuestDetails from "./pages/GuestDetails";
import { UserContext } from "./util/UserContext";

//just a comment so that vercel deploys again - fighting a 'danger'-message...

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
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
