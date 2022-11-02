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
  const { favoriteArray, setFavoriteArray } = useContext(UserContext);
  const [moreInformation, toggleMoreInformation] = useState(false);
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    function recipeIsFavorite() {
      if (
        favoriteArray.some(
          (favorite) => favorite.recipe.uri === recipeData.recipe.uri
        )
      ) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
    recipeIsFavorite();
  }, []);

  function toggleState(state, setState) {
    setState(!state);
  }

  function changeFavorite(id) {
    if (!favorite) {
      setFavoriteArray([...favoriteArray, recipeData]);
    } else {
      setFavoriteArray(
        favoriteArray.filter((favorite) => favorite.recipe.uri !== id)
      );
    }
    toggleState(favorite, setFavorite);
  }

  return (
    <StyledArticle>
      <h4>{label}</h4>
      <StyledImg src={image} height="250px" width="80%" alt="" />
      <StyledInfoButton
        onClick={() => toggleState(moreInformation, toggleMoreInformation)}
      >
        <img src={moreInformation ? arrowDownIcon : arrowRightIcon} alt="" />
        More information
      </StyledInfoButton>
      <StyledFavoriteButton onClick={() => changeFavorite(uri)}>
        <img
          src={favorite ? filledHeartIcon : emptyHeartIcon}
          alt="favorite button"
        />
      </StyledFavoriteButton>
      <StyledInfoSection
        style={moreInformation ? { display: "unset" } : { display: "none" }}
      >
        <StyledTime>{totalTime === 0 ? "" : `~${totalTime}min`}</StyledTime>
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
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  position: relative;
  padding: 20px;
  width: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px auto;
  border: 1px solid black;
  border-radius: 35px;
  background-color: lightgrey;

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
  background-color: transparent;
  border: unset;
  top: 10px;
  right: 10px;
`;

const StyledTime = styled.p`
  margin: 10px 10%;
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

  &:hover {
    cursor: pointer;
  }
`;

const StyledImg = styled.img`
  margin: 10px 0;
  align-self: center;
  border-radius: 20px;
`;

const StyledInfoSection = styled.section`
  margin: 10px 0;

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
