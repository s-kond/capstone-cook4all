import styled from "styled-components";
import { useState } from "react";
import arrowRightIcon from "../assets/icons/ep_arrow-right.svg";
import arrowDownIcon from "../assets/icons/ep_arrow-down.svg";

export default function RecipeCard({ recipeData }) {
  const { label, image, totalTime, url, healthLabels, ingredients } =
    recipeData.recipe;
  const [moreInformation, toggleMoreInformation] = useState(false);

  function toggleInfo() {
    toggleMoreInformation(!moreInformation);
  }

  return (
    <StyledArticle>
      <h4>{label}</h4>
      <StyledImg src={image} height="250px" width="80%" alt="" />
      <StyledInfoButton onClick={() => toggleInfo()}>
        <img src={moreInformation ? arrowDownIcon : arrowRightIcon} alt="" />
        More information
      </StyledInfoButton>
      <StyledInfoSection
        style={moreInformation ? { display: "unset" } : { display: "none" }}
      >
        <StyledTime>{totalTime === 0 ? "" : `~${totalTime}min`}</StyledTime>
        <ul>
          <p>Ingredients:</p>
          {ingredients.map((ingredient) => (
            <li>{ingredient.text}</li>
          ))}
        </ul>
        <details>
          <summary>All considered intolerances etc.</summary>
          <p>{healthLabels.map((label) => ` ${label},`)}</p>
        </details>
        <a href={url}>See the whole recipe</a>
      </StyledInfoSection>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
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
