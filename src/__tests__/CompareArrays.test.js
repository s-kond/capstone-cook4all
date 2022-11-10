import "@testing-library/jest-dom";
import CompareArrays from "../util/CompareArrays";

test("Function to compare two arrays works", async () => {
  const array1 = [
    { id: 1, name: 20342 },
    { id: 2, name: "dum" },
  ];
  const array2 = [
    { id: 1, name: 20342 },
    { id: 2, name: "dum" },
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ];

  const result = CompareArrays(array1, array2);
  expect(result).toStrictEqual([
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ]);
});

test("Edge case 1 comparing two arrays", async () => {
  const array1 = [
    { id: 1, name: 20342 },
    { id: 2, name: "dum" },
  ];
  const array2 = [
    { id: 2, name: "dum" },
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ];

  const result = CompareArrays(array1, array2);
  expect(result).toStrictEqual([
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ]);
});

test("Edge case 2 comparing two arrays", async () => {
  const array1 = [
    { id: 1, name: 20342 },
    { id: 2, name: "dum" },
  ];
  const array2 = [
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ];

  const result = CompareArrays(array1, array2);
  expect(result).toStrictEqual([
    { id: 3, name: "di" },
    { id: 4, name: "dum" },
  ]);
});
