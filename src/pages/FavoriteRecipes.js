import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import edamamBadge from "../assets/Edamam_Badge_Transparent.svg";
import reloadIcon from "../assets/icons/uiw_reload.svg";
import { UserContext } from "../util/UserContext";

export default function FavoriteRecipes() {
  const {
    isLoggedIn,
    favoriteArray,
    setFavoriteArray,
    guestArray,
    changesCounter,
    setChangesCounter,
    initialFavoriteRecipes,
  } = useContext(UserContext);
  const [filteredFavorites, setFilteredFavorites] = useState(favoriteArray);
  const [deletedInitialFavorites, setDeletedInitialFavorites] = useState([]);
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

  useEffect(() => {
    if (isLoggedIn && initialFavoriteRecipes.length > 0) {
      setDeletedInitialFavorites(
        initialFavoriteRecipes.filter(
          (favorite) =>
            !favoriteArray
              .map((item) => item.recipe.uri)
              .includes(favorite.recipe.uri)
        )
      );
    }
  }, [filteredFavorites]);

  function restoreInitials() {
    setFavoriteArray([...favoriteArray, ...deletedInitialFavorites]);
    setChangesCounter(changesCounter - deletedInitialFavorites.length);
  }

  return (
    <>
      <Header title="Favorites" />
      <DisplaySelectedGuests />
      <hr />
      <StyledDivSection>
        <EdamamBadge src={edamamBadge} alt="powered by Edamam" />
        {deletedInitialFavorites.length > 0 && isLoggedIn && (
          <StyledRestoreButton type="button" onClick={restoreInitials}>
            <img src={reloadIcon} alt="reload original favorites" />
            <p>Reset</p>
          </StyledRestoreButton>
        )}
      </StyledDivSection>
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
  margin-bottom: 130px;
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
`;

const StyledDivSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin: 15px 0;
`;

const StyledRestoreButton = styled.button`
  border: unset;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 30px;
  }
`;
