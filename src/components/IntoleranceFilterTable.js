import styled from "styled-components";

export default function IntoleranceFilterInformation() {
  return (
    <StyledTable>
      <tr>
        <td>alcohol-free</td>
        <td>No alcohol used or contained</td>
      </tr>
      <tr>
        <td>Celery-Free</td>
        <td>Does not contain celery or derivatives</td>
      </tr>
      <tr>
        <td>Crustcean-Free</td>
        <td>
          Does not contain crustaceans (shrimp, lobster etc.) or derivatives
        </td>
      </tr>
      <tr>
        <td>Dairy-Free</td>
        <td>No dairy; no lactose</td>
      </tr>
      <tr>
        <td>DASH</td>
        <td>Dietary Approaches to Stop Hypertension diet</td>
      </tr>
      <tr>
        <td>Egg-Free</td>
        <td>No eggs or products containing eggs</td>
      </tr>
      <tr>
        <td>Fish-Free</td>
        <td>No fish or fish derivatives</td>
      </tr>
      <tr>
        <td>FODMAP-Free</td>
        <td>Does not contain FODMAP foods</td>
      </tr>
      <tr>
        <td>Gluten-Free</td>
        <td>No ingredients containing gluten</td>
      </tr>
      <tr>
        <td>Immuno-Supportive</td>
        <td>
          Recipes which fit a{" "}
          <a href="https://www.edamam.com/covid-19/">science-based approach</a>{" "}
          to eating to strengthen the immune system
        </td>
      </tr>
      <tr>
        <td>Keto-Friendly</td>
        <td>Maximum 7 grams of net carbs per serving</td>
      </tr>
      <tr>
        <td>Kidney-Friendly</td>
        <td>
          Per serving – phosphorus less than 250 mg AND potassium less than 500
          mg AND sodium less than 500 mg
        </td>
      </tr>
      <tr>
        <td>Kosher</td>
        <td>
          Contains only ingredients allowed by the kosher diet. However it does
          not guarantee kosher preparation of the ingredients themselves
        </td>
      </tr>
      <tr>
        <td>Low Potassium</td>
        <td>Less than 150mg per serving</td>
      </tr>
      <tr>
        <td>Low Sugar</td>
        <td>
          No simple sugars – glucose, dextrose, galactose, fructose, sucrose,
          lactose, maltose
        </td>
      </tr>
      <tr>
        <td>Lupine-Free</td>
        <td>Does not contain lupine or derivatives</td>
      </tr>
      <tr>
        <td>Mediterranean</td>
        <td>Mediterranean diet</td>
      </tr>
      <tr>
        <td>Mollusk-Free</td>
        <td>No mollusks</td>
      </tr>
      <tr>
        <td>Mustard-Free</td>
        <td>Does not contain mustard or derivatives</td>
      </tr>
      <tr>
        <td>No oil added</td>
        <td>
          No oil added except to what is contained in the basic ingredients
        </td>
      </tr>
      <tr>
        <td>Paleo</td>
        <td>
          Excludes what are perceived to be agricultural products; grains,
          legumes, dairy products, potatoes, refined salt, refined sugar, and
          processed oils
        </td>
      </tr>
      <tr>
        <td>Peanut-Free</td>
        <td>No peanuts or products containing peanuts</td>
      </tr>
      <tr>
        <td>Pescatarian</td>
        <td>
          Does not contain meat or meat based products, can contain dairy and
          fish
        </td>
      </tr>
      <tr>
        <td>Pork-Free</td>
        <td>Does not contain pork or derivatives</td>
      </tr>
      <tr>
        <td>Red-Meat-Free</td>
        <td>
          Does not contain beef, lamb, pork, duck, goose, game, horse, and other
          types of red meat or products containing red meat.
        </td>
      </tr>
      <tr>
        <td>Sesame-Free</td>
        <td>Does not contain sesame seed or derivatives</td>
      </tr>
      <tr>
        <td>Shellfish-Free</td>
        <td>No shellfish or shellfish derivatives</td>
      </tr>
      <tr>
        <td>Soy-Free</td>
        <td>No soy or products containing soy</td>
      </tr>
      <tr>
        <td>Sugar-Conscious</td>
        <td>Less than 4g of sugar per serving</td>
      </tr>
      <tr>
        <td>Sulfite-Free</td>
        <td>No Sulfites</td>
      </tr>
      <tr>
        <td>Tree-Nut-Free</td>
        <td>No tree nuts or products containing tree nuts</td>
      </tr>
      <tr>
        <td>Vegan</td>
        <td>No meat, poultry, fish, dairy, eggs or honey</td>
      </tr>
      <tr>
        <td>Vegetarian</td>
        <td>No meat, poultry, or fish</td>
      </tr>
      <tr>
        <td>Wheat-Free</td>
        <td>No wheat, can have gluten though</td>
      </tr>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  tr:nth-of-type(2n) {
    background-color: var(--secondary-color);
  }
  td {
    padding: 5px 0;
  }
  td:nth-of-type(1) {
    font-weight: bold;
  }
  td:nth-of-type(2) {
    padding-left: 20px;
  }
`;
