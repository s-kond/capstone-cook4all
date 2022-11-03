import { useContext } from "react";
import styled from "styled-components";
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
      <StyledFavoriteSection>
        {favoriteArray.map((favorite) => (
          <RecipeCard key={favorite.recipe.uri} recipeData={favorite} />
        ))}
      </StyledFavoriteSection>
      <NavBar />
    </>
  );
}

const StyledFavoriteSection = styled.section`
  margin-bottom: 100px;
`;
