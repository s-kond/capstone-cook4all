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
