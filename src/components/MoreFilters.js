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
  const [isMealTypeOpen, setIsMealTypeOpen] = useState(false);
  const [isDishTypeOpen, setIsDishTypeOpen] = useState(false);
  const [isCuisineTypeOpen, setIsCuisineTypeOpen] = useState(false);

  function handleSelect(event, type) {
    if (type === "mealTypes") {
      if (!selectedMealType.includes(event.target.value)) {
        setSelectedMealType([...selectedMealType, event.target.value]);
      } else if (selectedMealType.includes(event.target.value)) {
        setSelectedMealType(
          selectedMealType.filter((item) => item !== event.target.value)
        );
      }
    }
    if (type === "dishTypes") {
      if (!selectedDishType.includes(event.target.value)) {
        setSelectedDishType([...selectedDishType, event.target.value]);
      } else if (selectedDishType.includes(event.target.value)) {
        setSelectedDishType(
          selectedDishType.filter((item) => item !== event.target.value)
        );
      }
    }
    if (type === "cuisineTypes") {
      if (!selectedCuisineType.includes(event.target.value)) {
        setSelectedCuisineType([...selectedCuisineType, event.target.value]);
      } else if (selectedCuisineType.includes(event.target.value)) {
        setSelectedCuisineType(
          selectedCuisineType.filter((item) => item !== event.target.value)
        );
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

  function toggleTypeSelect(identifier) {
    if (identifier === "mealTypes") {
      setIsMealTypeOpen(!isMealTypeOpen);
    }
    if (identifier === "dishTypes") {
      setIsDishTypeOpen(!isDishTypeOpen);
    }
    if (identifier === "cuisineTypes") {
      setIsCuisineTypeOpen(!isCuisineTypeOpen);
    }
  }

  return (
    <section>
      <StyledSubSection>
        {selectedMealType.map((item) => (
          <StyledSelectedFilterButton
            key={item}
            type="button"
            value={item}
            onClick={(event) => handleDelete(event, "meal")}
          >
            {item}
          </StyledSelectedFilterButton>
        ))}
        {selectedDishType.map((item) => (
          <StyledSelectedFilterButton
            key={item}
            type="button"
            value={item}
            onClick={(event) => handleDelete(event, "dish")}
          >
            {item}
          </StyledSelectedFilterButton>
        ))}
        {selectedCuisineType.map((item) => (
          <StyledSelectedFilterButton
            key={item}
            type="button"
            value={item}
            onClick={(event) => handleDelete(event, "cuisine")}
          >
            {item}
          </StyledSelectedFilterButton>
        ))}
      </StyledSubSection>
      <StyledMoreFilterHeader>Add more filter:</StyledMoreFilterHeader>
      <StyledSubSection>
        {filterData.map((data) => {
          const { name } = data;
          return (
            <article key={name}>
              <StyledTypeSelect
                type="button"
                onClick={() => toggleTypeSelect(name)}
              >
                {name} &#8964;
              </StyledTypeSelect>
              <StyledOptions>
                {isMealTypeOpen &&
                  name === "mealTypes" &&
                  data.labels.map((type, index) => (
                    <label
                      key={type.label}
                      htmlFor={type.label}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        key={index}
                        type="checkbox"
                        id={type.label}
                        name={type.label}
                        value={type.value}
                        onChange={(event) => handleSelect(event, name)}
                        checked={
                          selectedMealType.includes(type.value) ? true : false
                        }
                      />
                      {type.label}
                    </label>
                  ))}
                {isDishTypeOpen &&
                  name === "dishTypes" &&
                  data.labels.map((type, index) => (
                    <label
                      key={type.label}
                      htmlFor={type.label}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        key={index}
                        type="checkbox"
                        id={type.label}
                        name={type.label}
                        value={type.value}
                        onChange={(event) => handleSelect(event, name)}
                        checked={
                          selectedDishType.includes(type.value) ? true : false
                        }
                      />
                      {type.label}
                    </label>
                  ))}
                {isCuisineTypeOpen &&
                  name === "cuisineTypes" &&
                  data.labels.map((type, index) => (
                    <label
                      key={type.label}
                      htmlFor={type.label}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        key={index}
                        type="checkbox"
                        id={type.label}
                        name={type.label}
                        value={type.value}
                        onChange={(event) => handleSelect(event, name)}
                        checked={
                          selectedCuisineType.includes(type.value)
                            ? true
                            : false
                        }
                      />
                      {type.label}
                    </label>
                  ))}
              </StyledOptions>
            </article>
          );
        })}
      </StyledSubSection>
    </section>
  );
}

const StyledTypeSelect = styled.button`
  text-align: left;
  padding: 3px 5px 5px 5px;
  font-size: 0.9rem;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid grey;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledMoreFilterHeader = styled.h3`
  margin: 8px 0;
`;

const StyledOptions = styled.article`
  display: flex;
  flex-direction: column;
  label {
    margin: 2px 0;
    padding: 2px 0;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: var(--secondary-color);
    }

    input {
      margin-right: 5px;
    }
  }
`;

const StyledSelectedFilterButton = styled.button`
  border: unset;
  background-color: lightgrey;
  padding: 5px;
  border-radius: 5px;
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

  &:last-of-type {
    justify-content: flex-start;
    gap: 20px;
  }
`;
