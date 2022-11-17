import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import arrowRightIcon from "../assets/icons/ep_arrow-right.svg";
import arrowDownIcon from "../assets/icons/ep_arrow-down.svg";
import emptyHeartIcon from "../assets/icons/heart-outlined.svg";
import filledHeartIcon from "../assets/icons/heart-filled.svg";
import { UserContext } from "../util/UserContext";

export default function RecipeCard({ recipeData }) {
  const { label, image, totalTime, uri, url, healthLabels, ingredients } =
    recipeData.recipe;
  const {
    favoriteArray,
    setFavoriteArray,
    changesCounter,
    setChangesCounter,
    initialFavoriteRecipes,
  } = useContext(UserContext);
  const [moreInformation, toggleMoreInformation] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    function recipeIsFavorite() {
      if (
        favoriteArray.some(
          (favorite) => favorite.recipe.uri === recipeData.recipe.uri
        )
      ) {
        setFavorite(true);
      }
    }
    recipeIsFavorite();
  }, []);

  function changeFavorite(id) {
    const isInitialFavoriteRecipe = initialFavoriteRecipes
      .map((favorite) => favorite.recipe.uri)
      .includes(id);
    if (!favorite) {
      setFavoriteArray([...favoriteArray, recipeData]);
      setChangesCounter(changesCounter + 1);
    } else {
      setFavoriteArray(
        favoriteArray.filter((favorite) => favorite.recipe.uri !== id)
      );
      if (isInitialFavoriteRecipe) {
        setChangesCounter(changesCounter + 1);
      } else {
        setChangesCounter(changesCounter - 1);
      }
    }
    setFavorite(!favorite);
  }

  return (
    <StyledArticle>
      <StyledImg src={image} alt="" />
      <h4>{label}</h4>
      <StyledInfoButton onClick={() => toggleMoreInformation(!moreInformation)}>
        <img src={moreInformation ? arrowDownIcon : arrowRightIcon} alt="" />
        More information
      </StyledInfoButton>
      <StyledFavoriteButton onClick={() => changeFavorite(uri)}>
        <img
          src={favorite ? filledHeartIcon : emptyHeartIcon}
          height="50px"
          width="50px"
          alt="favorite button"
        />
      </StyledFavoriteButton>
      {moreInformation && (
        <StyledInfoSection moreInformation={moreInformation}>
          <StyledTime>{totalTime !== 0 && `~${totalTime}min`}</StyledTime>
          <ul>
            <p>Ingredients:</p>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
          <details>
            <summary>All considered intolerances etc.</summary>
            <p>{healthLabels.map((label) => ` ${label}`).join(", ")}</p>
          </details>
          <a href={url}>See the whole recipe</a>
        </StyledInfoSection>
      )}
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  position: relative;
  width: 80%;
  max-width: 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px auto;
  padding-bottom: 10px;
  box-shadow: 1px 2px 3px;
  border-radius: 20px;
  background-color: var(--secondary-color);

  &:first-of-type {
    margin-top: 40px;
  }

  @media (min-width: 900px) {
    &:first-of-type {
      margin-top: 50px;
    }
  }

  h4 {
    align-self: left;
    text-align: left;
    font-size: 1.2rem;
    margin: 0 10% 0 10%;
  }

  details {
    margin: 30px 10% 20px 10%;
    &:hover {
      cursor: pointer;
    }
  }
  summary {
    margin-bottom: 10px;
  }
`;

const StyledFavoriteButton = styled.button`
  position: absolute;
  background-color: var(--secondary-color);
  border: unset;
  border-radius: 20px;
  padding-top: 5px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledTime = styled.p`
  margin: 10px 0;
  padding-right: 20px;
  display: block;
  text-align: right;
`;

const StyledInfoButton = styled.button`
  display: flex;
  align-items: center;
  margin: 10px 10% 0 8%;
  border: unset;
  background-color: transparent;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }
`;

const StyledImg = styled.img`
  margin-bottom: 10px;
  align-self: center;
  border-radius: 20px;
  width: 100%;
  height: 300px;
`;

const StyledInfoSection = styled.section`
  margin: 10px 0;
  width: 100%;

  ul p {
    text-decoration: underline;
  }
  ul {
    list-style: none;
  }
  li {
    margin: 10px 0;
  }

  a {
    display: block;
    margin: 20px 10% 10px 10%;
  }
`;
