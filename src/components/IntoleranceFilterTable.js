import styled from "styled-components";

export default function IntoleranceFilterInformation() {
  return (
    <StyledTable>
      <TableRow>
        <TableCell>Alcohol-free</TableCell>
        <TableCell>No alcohol used or contained</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Celery-Free</TableCell>
        <TableCell>Does not contain celery or derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Crustacean-Free</TableCell>
        <TableCell>
          Does not contain crustaceans (shrimp, lobster etc.) or derivatives
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Dairy-Free</TableCell>
        <TableCell>No dairy; no lactose</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>DASH</TableCell>
        <TableCell>Dietary Approaches to Stop Hypertension diet</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Egg-Free</TableCell>
        <TableCell>No eggs or products containing eggs</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Fish-Free</TableCell>
        <TableCell>No fish or fish derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>FODMAP-Free</TableCell>
        <TableCell>Does not contain FODMAP foods</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gluten-Free</TableCell>
        <TableCell>No ingredients containing gluten</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Immuno-Supportive</TableCell>
        <TableCell>
          Recipes which fit a{" "}
          <a href="https://www.edamam.com/covid-19/">science-based approach</a>{" "}
          to eating to strengthen the immune system
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Keto-Friendly</TableCell>
        <TableCell>Maximum 7 grams of net carbs per serving</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Kidney-Friendly</TableCell>
        <TableCell>
          Per serving – phosphorus less than 250 mg AND potassium less than 500
          mg AND sodium less than 500 mg
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Kosher</TableCell>
        <TableCell>
          Contains only ingredients allowed by the kosher diet. However it does
          not guarantee kosher preparation of the ingredients themselves
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Low Potassium</TableCell>
        <TableCell>Less than 150mg per serving</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Low Sugar</TableCell>
        <TableCell>
          No simple sugars – glucose, dextrose, galactose, fructose, sucrose,
          lactose, maltose
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Lupine-Free</TableCell>
        <TableCell>Does not contain lupine or derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Mediterranean</TableCell>
        <TableCell>Mediterranean diet</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Mollusk-Free</TableCell>
        <TableCell>No mollusks</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Mustard-Free</TableCell>
        <TableCell>Does not contain mustard or derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>No oil added</TableCell>
        <TableCell>
          No oil added except to what is contained in the basic ingredients
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Paleo</TableCell>
        <TableCell>
          Excludes what are perceived to be agricultural products; grains,
          legumes, dairy products, potatoes, refined salt, refined sugar, and
          processed oils
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Peanut-Free</TableCell>
        <TableCell>No peanuts or products containing peanuts</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Pescatarian</TableCell>
        <TableCell>
          Does not contain meat or meat based products, can contain dairy and
          fish
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Pork-Free</TableCell>
        <TableCell>Does not contain pork or derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Red-Meat-Free</TableCell>
        <TableCell>
          Does not contain beef, lamb, pork, duck, goose, game, horse, and other
          types of red meat or products containing red meat.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sesame-Free</TableCell>
        <TableCell>Does not contain sesame seed or derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Shellfish-Free</TableCell>
        <TableCell>No shellfish or shellfish derivatives</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Soy-Free</TableCell>
        <TableCell>No soy or products containing soy</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sugar-Conscious</TableCell>
        <TableCell>Less than 4g of sugar per serving</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Sulfite-Free</TableCell>
        <TableCell>No Sulfites</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Tree-Nut-Free</TableCell>
        <TableCell>No tree nuts or products containing tree nuts</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Vegan</TableCell>
        <TableCell>No meat, poultry, fish, dairy, eggs or honey</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Vegetarian</TableCell>
        <TableCell>No meat, poultry, or fish</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Wheat-Free</TableCell>
        <TableCell>No wheat, can have gluten though</TableCell>
      </TableRow>
    </StyledTable>
  );
}

const StyledTable = styled.section`
  display: table;
  text-align: left;
  font-size: 1rem;
`;

const TableRow = styled.article`
  display: table-row;
  &:nth-of-type(2n) {
    background-color: var(--secondary-color);
  }
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 5px 0;
  &:nth-of-type(1) {
    font-weight: bold;
  }
  &:nth-of-type(2) {
    padding-left: 10px;
    @media (max-width: 400px) {
      padding-left: unset;
    }
  }
`;
