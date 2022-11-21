import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import getIntolerances from "../util/GetSelectedGuestsIntolerances";
import DisplaySelectedGuests from "../components/DisplaySelectedGuests";
import moreIcon from "../assets/icons/ep_arrow-down.svg";
import MoreFilters from "../components/MoreFilters";
import edamamBadge from "../assets/Edamam_Badge_Transparent.svg";

export default function Recipes() {
  const { guestArray } = useContext(UserContext);
  let intolerances = getIntolerances(guestArray);
  let modifiedIntolerances = intolerances.map((intolerance) => {
    if (intolerance === "DASH" || intolerance === "Mediterranean") {
      return intolerance;
    } else {
      return intolerance.replaceAll(" ", "-").toLowerCase();
    }
  });

  const [recipeData, setRecipeData] = useState([]);
  const [availableData, setAvailableData] = useState(true);
  const [nextPage, setNextPage] = useState();
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [selectedDishType, setSelectedDishType] = useState([]);
  const [selectedCuisineType, setSelectedCuisineType] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_ID = process.env.REACT_APP_API_ID;

  async function fetchData(searchInput) {
    const healthParams = modifiedIntolerances
      .map((item) => `&health=${item}`)
      .join("");
    const mealTypeParams = selectedMealType
      .map((item) => `&mealType=${item}`)
      .join("");
    const dishTypeParams = selectedDishType
      .map((item) => `&dishType=${item}`)
      .join("");
    const cuisineTypeParams = selectedCuisineType
      .map((item) => `&cuisineType=${item}`)
      .join("");
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${API_ID}&app_key=${API_KEY}${healthParams}${mealTypeParams}${dishTypeParams}${cuisineTypeParams}`;
    const response = await fetch(url);
    const data = await response.json();
    data.hits.length > 0 && setNextPage(data._links.next.href);
    setRecipeData(data.hits);
    setAvailableData(data.hits.length > 0 ? true : false);
  }

  async function fetchNextPage(url) {
    const response = await fetch(url);
    const data = await response.json();
    setNextPage(data._links.next.href);
    setRecipeData([...recipeData, ...data.hits]);
  }

  function handleRecipeSearch(event) {
    event.preventDefault();
    setRecipeData([]);
    const form = event.target;
    const { recipeSearch } = form.elements;
    fetchData(recipeSearch.value);
    recipeSearch.value = "";
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
      <Header title="Recipes" />
      <DisplaySelectedGuests />
      <StyledForm onSubmit={(event) => handleRecipeSearch(event)}>
        <MoreFilters
          selectedMealType={selectedMealType}
          setSelectedMealType={setSelectedMealType}
          selectedDishType={selectedDishType}
          setSelectedDishType={setSelectedDishType}
          selectedCuisineType={selectedCuisineType}
          setSelectedCuisineType={setSelectedCuisineType}
        />
        <RecipeSearchLabel htmlFor="recipeSearch">
          So, what do you want to eat?
        </RecipeSearchLabel>
        <RecipeSearchInput
          id="recipeSearch"
          name="recipeSearch"
          type="text"
          placeholder="e.g. strawberry, ..."
        />
        <RecipeSearchButton type="submit">Search</RecipeSearchButton>
      </StyledForm>
      <hr />
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
          <EdamamBadge src={edamamBadge} alt="powered by Edamam" />
          {availableData && nextPage && (
            <StyledMoreButton
              type="button"
              onClick={() => fetchNextPage(nextPage)}
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

const StyledForm = styled.form`
  text-align: left;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const RecipeSearchLabel = styled.label`
  display: block;
  text-align: left;
  margin: 20px 0 10px 0;
  font-weight: bold;
`;

const StyledRecipeSection = styled.section`
  margin-top: 20px;
  margin-bottom: 100px;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  pre {
    margin: 10px auto 20px auto;
  }
`;

const StyledSorryMessage = styled.p`
  margin-top: 20px;
`;

const StyledMoreButton = styled.button`
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

const EdamamBadge = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const RecipeSearchInput = styled.input`
  border-radius: 15px 0 0 15px;
  width: 50%;
  border: 1px solid grey;
  padding: 5px;
`;

const RecipeSearchButton = styled.button`
  margin-left: 0;
  padding: 5px 10px;
  background-color: var(--primary-color);
  border-radius: 0 15px 15px 0;
  border: 1px solid grey;
  border-left: unset;
  cursor: pointer;
`;
