import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import { UserContext } from "../util/UserContext";
import { StyledHeader } from "./Home";

export default function FavoriteRecipes() {
  const { favoriteArray, guestArray } = useContext(UserContext);
  const [filteredFavorites, setFilteredFavorites] = useState(favoriteArray);
  const intolerances = getIntolerances(guestArray);
  const upperCaseIntolerances = intolerances.map(
    (item) => item[0].toUpperCase() + item.slice(1)
  );

  useEffect(() => {
    setFilteredFavorites(
      favoriteArray.filter((item) =>
        upperCaseIntolerances.every((intolerance) =>
          item.recipe.healthLabels.includes(intolerance)
        )
      )
    );
  }, [favoriteArray]);

  return (
    <>
      <StyledHeader>
        <h2>Favorites</h2>
      </StyledHeader>
      <DisplaySelectedGuests />
      <hr />
      <StyledFavoriteSection>
        {filteredFavorites.map((favorite) => (
          <RecipeCard key={favorite.recipe.uri} recipeData={favorite} />
        ))}
      </StyledFavoriteSection>
      {favoriteArray.length === 0 ? (
        <>
          <StyledEmptyMessage>You have no favorite recipes.</StyledEmptyMessage>
          <p>Go to the recipe page and find new favorites!</p>
        </>
      ) : filteredFavorites.length === 0 ? (
        <>
          <StyledEmptyMessage>
            Unfortunately, there are no favorite recipes <br /> for all of your
            guests... :(
          </StyledEmptyMessage>
          <p>Go to the recipe page and find new favorites!</p>
        </>
      ) : null}
      <NavBar />
    </>
  );
}

const StyledFavoriteSection = styled.section`
  margin-bottom: 100px;
  p {
    margin: 0;
  }
`;

const StyledEmptyMessage = styled.p`
  margin-top: 70px;
  margin-bottom: 10px;
`;
