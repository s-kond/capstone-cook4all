import { useState } from "react";
import styled from "styled-components";
import { filterData } from "../assets/data";

export default function MoreFilters({
  selectedMealType,
  setSelectedMealType,
  selectedDishType,
  setSelectedDishType,
  selectedCuisineType,
  setSelectedCuisineType,
}) {
  const [isMoreFilter, setIsMoreFilter] = useState(false);

  function handleSelect(event, type) {
    if (type === "mealTypes") {
      if (!selectedMealType.includes(event.target.value)) {
        setSelectedMealType([...selectedMealType, event.target.value]);
      }
    }
    if (type === "dishTypes") {
      if (!selectedDishType.includes(event.target.value)) {
        setSelectedDishType([...selectedDishType, event.target.value]);
      }
    }
    if (type === "cuisineTypes") {
      if (!selectedCuisineType.includes(event.target.value)) {
        setSelectedCuisineType([...selectedCuisineType, event.target.value]);
      }
    }
  }

  function handleDelete(event, type) {
    if (type === "meal") {
      setSelectedMealType(
        selectedMealType.filter((meal) => meal !== event.target.value)
      );
    }
    if (type === "dish") {
      setSelectedDishType(
        selectedDishType.filter((dish) => dish !== event.target.value)
      );
    }
    if (type === "cuisine") {
      setSelectedCuisineType(
        selectedCuisineType.filter((cuisine) => cuisine !== event.target.value)
      );
    }
  }

  return (
    <>
      <StyledFilterSection>
        <StyledSubSection>
          {selectedMealType.map((item) => (
            <StyledFilterButton
              key={item}
              type="button"
              value={item}
              onClick={(event) => handleDelete(event, "meal")}
            >
              {item} x
            </StyledFilterButton>
          ))}
          {selectedDishType.map((item) => (
            <StyledFilterButton
              key={item}
              type="button"
              value={item}
              onClick={(event) => handleDelete(event, "dish")}
            >
              {item} x
            </StyledFilterButton>
          ))}
          {selectedCuisineType.map((item) => (
            <StyledFilterButton
              key={item}
              type="button"
              value={item}
              onClick={(event) => handleDelete(event, "cuisine")}
            >
              {item} x
            </StyledFilterButton>
          ))}
        </StyledSubSection>
        <StyledMoreFilterButton
          type="button"
          onClick={() => setIsMoreFilter(!isMoreFilter)}
        >
          <p>{isMoreFilter ? "-" : "+"} Add more filter</p>
        </StyledMoreFilterButton>
        {isMoreFilter && (
          <StyledSubSection>
            {filterData.map((data) => {
              const { name } = data;
              return (
                <article key={name}>
                  <StyledLabel htmlFor={name}>{name}</StyledLabel>
                  <select
                    id={name}
                    name={name}
                    onChange={(event) => handleSelect(event, name)}
                    multiple
                    size="4"
                  >
                    {data.labels.map((type) => (
                      <option key={type.label} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </article>
              );
            })}
          </StyledSubSection>
        )}
      </StyledFilterSection>
    </>
  );
}

const StyledLabel = styled.label`
  display: block;
  text-align: center;
  margin-bottom: 5px;
`;

const StyledFilterSection = styled.section``;

const StyledMoreFilterButton = styled.button`
  margin: 15px 20px 5px 0;
  width: 90%;
  padding: 5px 0;
  border: unset;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
`;

const StyledFilterButton = styled.button`
  border: unset;
  background-color: transparent;
  padding: 3px 0;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const StyledSubSection = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;
`;
