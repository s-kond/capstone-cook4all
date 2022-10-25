import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/create-guest" element={<CreateGuest />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
