import { StyledHeader } from "./Home";
import { useState, useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";

export default function Recipes() {
  const { guestArray } = useContext(UserContext);
  let intolerances = getIntolerances(guestArray);
  const [data, setData] = useState([]);
  const [availableData, setAvailableData] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_ID = process.env.REACT_APP_API_ID;

  async function fetchData(searchInput) {
    const healthParams = intolerances.map((item) => `&health=${item}`).join("");
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${API_ID}&app_key=${API_KEY}${healthParams}`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data.hits);
    setAvailableData(data.hits.length > 0 ? true : false);
  }

  function onSubmit(event) {
    event.preventDefault();
    setData([]);
    const form = event.target;
    const { recipeSearch } = form.elements;
    fetchData(recipeSearch.value);
    recipeSearch.value = "";
    recipeSearch.focus();
  }

  return (
    <>
      <StyledHeader>
        <h2>Recipes</h2>
      </StyledHeader>
      <DisplaySelectedGuests />
      <hr />
      <form onSubmit={(event) => onSubmit(event)}>
        <RecipeSearchLabel htmlFor="recipeSearch">
          So, what do you want to eat?
        </RecipeSearchLabel>
        <input
          id="recipeSearch"
          name="recipeSearch"
          type="text"
          placeholder="pasta"
        />
        <button type="submit">Search</button>
      </form>
      <StyledRecipeSection>
        {data.map((recipe, index) => (
          <RecipeCard key={index} recipeData={recipe} />
        ))}
        <StyledSorryMessage
          style={{ display: availableData ? "none" : "block" }}
        >
          Sorry, we couldn't find any recipes... <br /> Please try again!
        </StyledSorryMessage>
      </StyledRecipeSection>
      <NavBar />
    </>
  );
}

const RecipeSearchLabel = styled.label`
  display: block;
  margin: 20px auto 10px auto;
  font-weight: bold;
`;

const StyledRecipeSection = styled.section`
  margin-bottom: 100px;
`;

const StyledSorryMessage = styled.p`
  margin-top: 20px;
`;
