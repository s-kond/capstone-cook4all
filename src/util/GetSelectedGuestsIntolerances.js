/**
 * Returns a filtered array with the intolerances of the selected guests from guestArray.
 *
 * @param {array} guestArray An array containing 'guest'-objects.
 * @property {object} guest An object containing an array of intolerances (objects with id and name) and a 'selected'-property (boolean).
 * @return {array} returns an array containing all intolerances from 'selected' guests (strings) without double entries.
 */

export function GetSelectedGuestsIntolerances(guestArray) {
  let intolerancesObjects = [];
  const selectedGuestsIntolerances = guestArray
    .filter((guest) => guest.selected)
    .map((guest) => guest.intolerances);

  for (let item of selectedGuestsIntolerances) {
    intolerancesObjects = [...item, ...intolerancesObjects];
  }
  const intolerancesNames = intolerancesObjects
    .map((item) => item.name)
    .reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);
  return intolerancesNames;
}

export default GetSelectedGuestsIntolerances;
