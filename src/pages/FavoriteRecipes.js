import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import edamamBadge from "../assets/Edamam_Badge_Transparent.svg";
import { UserContext } from "../util/UserContext";

export default function FavoriteRecipes() {
  const { favoriteArray, guestArray } = useContext(UserContext);
  const [filteredFavorites, setFilteredFavorites] = useState(favoriteArray);
  const intolerances = getIntolerances(guestArray);

  useEffect(() => {
    setFilteredFavorites(
      favoriteArray.filter((item) =>
        intolerances.every((intolerance) =>
          item.recipe.healthLabels.includes(intolerance)
        )
      )
    );
  }, [favoriteArray]);

  return (
    <>
      <Header title="Favorites" />
      <DisplaySelectedGuests />
      <hr />
      <StyledFavoriteSection>
        {filteredFavorites.map((favorite) => (
          <RecipeCard key={favorite.recipe.uri} recipeData={favorite} />
        ))}
      </StyledFavoriteSection>
      <EdamamBadge src={edamamBadge} alt="powered by Edamam" />
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
  margin-bottom: 20px;
  @media (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledEmptyMessage = styled.p`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const EdamamBadge = styled.img`
  width: 150px;
  margin-bottom: 100px;
`;
