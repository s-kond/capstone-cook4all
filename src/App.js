import Home from "./pages/Home";
import CreateGuest from "./pages/CreateGuest";
import EditGuest from "./pages/EditGuest";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import FavoriteRecipes from "./pages/FavoriteRecipes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="favorites" element={<FavoriteRecipes />} />
        <Route path="create-guest" element={<CreateGuest />} />
        <Route path="edit-guest/:id" element={<EditGuest />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
