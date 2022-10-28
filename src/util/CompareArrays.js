/**
 * Returns a filtered array ('allPossibleIntolerances' minus 'userIntolerances').
 *
 * @param {array} userIntolerances An array containing objects with an id.
 * @param {array} allPossibleIntolerances A second array containing objects with an id including those from userIntolerances.
 * @return {array} returns an array with the allPossibleIntolerances-objects minus the userIntolerances-objects.
 */

const compareArrays = (userIntolerances, allPossibleIntolerances) =>
  allPossibleIntolerances.filter(
    (intolerance) =>
      !userIntolerances.map((item) => item.id).includes(intolerance.id)
  );

export default compareArrays;
