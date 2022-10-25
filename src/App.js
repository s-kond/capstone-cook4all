import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";

const testArray = [
  { id: nanoid(), name: "John", notes: "Likes his coffee black" },
  { id: nanoid(), name: "Anna", notes: "Doesn't like cucumber." },
];

function App() {
  const [guestArray, setGuestArray] = useState(testArray);

  function createGuest(newName, newNotes) {
    setGuestArray([
      { id: nanoid(), name: newName, notes: newNotes },
      ...guestArray,
    ]);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home data={guestArray} />} />
        <Route
          path="create-guest"
          element={<CreateGuest onHandleSubmit={createGuest} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
