//a function to compare two arrays with objects ->
//array1 (userIntolerances) containing objects that should be deleted from array2 (allPossibleIntolerances)

const compareArrays = (userIntolerances, allPossibleIntolerances) =>
  allPossibleIntolerances.filter(
    (intolerance) =>
      !userIntolerances.map((item) => item.id).includes(intolerance.id)
  );

export default compareArrays;
