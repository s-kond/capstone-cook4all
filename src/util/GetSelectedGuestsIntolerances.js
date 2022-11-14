/**
 * Returns a filtered array with the intolerances of the selected guests from guestArray.
 *
 * @param {array} guestArray An array containing 'guest'-objects.
 * @property {object} guest An object containing an array of intolerances (objects with id and name) and a 'selected'-property (boolean).
 * @return {array} returns an array containing all intolerances from 'selected' guests (strings) without double entries.
 */

export function GetSelectedGuestsIntolerances(guestArray) {
  return [
    ...new Set(
      guestArray
        .filter((guest) => guest.selected)
        .reduce(
          (acc, curr) => [
            ...acc,
            ...curr.intolerances.map((intolerance) => intolerance.name),
          ],
          []
        )
    ),
  ];
}

export default GetSelectedGuestsIntolerances;
