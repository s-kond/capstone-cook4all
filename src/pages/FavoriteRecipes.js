import { useContext } from "react";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import { UserContext } from "../util/UserContext";
import { StyledHeader } from "./Home";

export default function FavoriteRecipes() {
  const { favoriteArray } = useContext(UserContext);
  return (
    <>
      <StyledHeader>
        <h2>Favorites</h2>
      </StyledHeader>
      <h3>Under Construction</h3>
      <section>
        {favoriteArray.map((favorite) => (
          <RecipeCard key={favorite.recipe.uri} recipeData={favorite} />
        ))}
      </section>
      <NavBar />
    </>
  );
}
