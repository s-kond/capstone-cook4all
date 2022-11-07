import styled from "styled-components";

export default function MoreFilters({
  selectedMealType,
  setSelectedMealType,
  selectedDishType,
  setSelectedDishType,
}) {
  const mealtypes = [
    { label: "breakfast", value: "Breakfast" },
    { label: "brunch", value: "Brunch" },
    { label: "lunch/dinner", value: "Lunch" },
    { label: "snack", value: "Snack" },
  ];

  const dishtypes = [
    { label: "starter", value: "Starter" },
    { label: "main course", value: "Main course" },
    { label: "side dish", value: "Side dish" },
    { label: "desserts", value: "Desserts" },
    { label: "ice cream", value: "Ice cream and custard" },
    { label: "biscuits", value: "Biscuits and cookies" },
    { label: "pastry", value: "Pastry" },
    { label: "pies and tarts", value: "Pies and tarts" },
    { label: "sweets", value: "Sweets" },
    { label: "condiments and sauces", value: "Condiments and sauces" },
    { label: "drinks", value: "Drinks" },
    { label: "alcohol cocktail", value: "Alcohol cocktail" },
  ];

  function handleSelect(event, type) {
    if (type === "meal") {
      if (!selectedMealType.includes(event.target.value)) {
        setSelectedMealType([...selectedMealType, event.target.value]);
      }
    }
    if (type === "dish") {
      if (!selectedDishType.includes(event.target.value)) {
        setSelectedDishType([...selectedDishType, event.target.value]);
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
  }

  return (
    <>
      <StyledFilterSection>
        <article>
          <StyledLabel htmlFor="mealtypes">Mealtypes:</StyledLabel>
          <select
            id="mealtypes"
            name="mealtypes"
            onChange={(event) => handleSelect(event, "meal")}
            multiple
            size="2"
          >
            {mealtypes.map((mealtype) => (
              <option key={mealtype.label} value={mealtype.value}>
                {mealtype.label}
              </option>
            ))}
          </select>
        </article>
        <article>
          <StyledLabel htmlFor="dishtypes">Dishtypes:</StyledLabel>
          <select
            id="dishtypes"
            name="dishtypes"
            onChange={(event) => handleSelect(event, "dish")}
            multiple
            size="2"
          >
            {dishtypes.map((type) => (
              <option key={type.label} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </article>
      </StyledFilterSection>
      <section>
        {selectedMealType.map((item) => (
          <button
            key={item}
            type="button"
            value={item}
            onClick={(event) => handleDelete(event, "meal")}
          >
            x {item}
          </button>
        ))}
        {selectedDishType.map((item) => (
          <button
            key={item}
            type="button"
            value={item}
            onClick={(event) => handleDelete(event, "dish")}
          >
            x {item}
          </button>
        ))}
      </section>
    </>
  );
}

const StyledLabel = styled.label`
  display: block;
  margin: 20px 0 10px 0;
`;

const StyledFilterSection = styled.section`
  display: flex;
  justify-content: space-evenly;
`;
