import { StyledHeader } from "./Home";
import { useState, useContext } from "react";
import { UserContext } from "../util/UserContext";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";
import moreIcon from "../assets/icons/ep_arrow-down.svg";

export default function Recipes() {
  const { guestArray } = useContext(UserContext);
  let intolerances = getIntolerances(guestArray);
  const [recipeData, setRecipeData] = useState([]);
  const [availableData, setAvailableData] = useState(true);
  const [nextPage, setNextPage] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_ID = process.env.REACT_APP_API_ID;

  async function fetchData(searchInput) {
    const healthParams = intolerances.map((item) => `&health=${item}`).join("");
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${API_ID}&app_key=${API_KEY}${healthParams}`;
    const response = await fetch(url);
    const data = await response.json();
    data.hits.length > 0 && setNextPage(data._links.next.href);
    setRecipeData(data.hits);
    setAvailableData(data.hits.length > 0 ? true : false);
  }

  async function fetchDifferentPage(url) {
    const response = await fetch(url);
    const data = await response.json();
    setNextPage(data._links.next.href);
    setRecipeData([...recipeData, ...data.hits]);
  }

  function onSubmit(event) {
    event.preventDefault();
    setRecipeData([]);
    const form = event.target;
    const { recipeSearch } = form.elements;
    fetchData(recipeSearch.value);
    recipeSearch.value = "";
    recipeSearch.focus();
  }

  function ErrorCallback({ error, resetErrorBoundary }) {
    return (
      <StyledRecipeSection role="alert">
        <p>Sorry, something went wrong. Error:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </StyledRecipeSection>
    );
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
      <ErrorBoundary
        FallbackComponent={ErrorCallback}
        onReset={() => setRecipeData([])}
      >
        <StyledRecipeSection>
          {recipeData.map((recipe, index) => (
            <RecipeCard key={index} recipeData={recipe} />
          ))}
          {!availableData && (
            <StyledSorryMessage>
              Sorry, we couldn't find any recipes... <br /> Please try again!
            </StyledSorryMessage>
          )}
          {availableData && nextPage && (
            <StyledMoreButton
              type="button"
              onClick={() => fetchDifferentPage(nextPage)}
            >
              Show more
              <img src={moreIcon} alt="arrow down" />
            </StyledMoreButton>
          )}
        </StyledRecipeSection>
      </ErrorBoundary>
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
  margin-top: 20px;
  margin-bottom: 100px;

  @media (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  }

  pre {
    margin: 10px auto 20px auto;
  }
`;

const StyledSorryMessage = styled.p`
  margin-top: 20px;
`;

const StyledMoreButton = styled.button`
  /* display: ${({ nextPage }) => (nextPage ? "flex" : "none")}; */
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
  }
`;
