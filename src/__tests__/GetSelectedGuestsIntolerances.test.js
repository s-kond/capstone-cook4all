import "@testing-library/jest-dom";
import GetSelectedGuestsIntolerances from "../util/GetSelectedGuestsIntolerances.js";

test("return intolerances from all selected guests - no double intolerances", () => {
  const testArray = [
    {
      id: 1,
      name: "John",
      intolerances: [
        { id: 5, name: "Dairy-Free" },
        { id: 10, name: "Gluten-Free" },
      ],
      notes: "Likes his coffee black",
      selected: true,
    },
    {
      id: 2,
      name: "Anna",
      intolerances: [{ id: 14, name: "Kosher" }],
      notes: "Doesn't like cucumber.",
      selected: true,
    },
    {
      id: 3,
      name: "Bob",
      intolerances: [{ id: 23, name: "Peanut-Free" }],
      notes: "",
      selected: false,
    },
  ];

  const result = GetSelectedGuestsIntolerances(testArray);
  expect(result).toEqual(["Dairy-Free", "Gluten-Free", "Kosher"]);
});

test("return intolerances from all selected guests - double intolerances", () => {
  const testArray = [
    {
      id: 1,
      name: "John",
      intolerances: [
        { id: 6, name: "DASH" },
        { id: 7, name: "Egg-Free" },
        { id: 8, name: "Fish-Free" },
      ],
      notes: "Likes his coffee black",
      selected: true,
    },
    {
      id: 2,
      name: "Anna",
      intolerances: [
        { id: 14, name: "Kosher" },
        { id: 8, name: "Fish-Free" },
      ],
      notes: "Doesn't like cucumber.",
      selected: true,
    },
    {
      id: 3,
      name: "Bob",
      intolerances: [
        { id: 18, name: "Mediterranean" },
        { id: 19, name: "Mollusk-Free" },
      ],
      notes: "",
      selected: false,
    },
  ];

  const result = GetSelectedGuestsIntolerances(testArray);
  expect(result).toEqual(["DASH", "Egg-Free", "Fish-Free", "Kosher"]);
});
