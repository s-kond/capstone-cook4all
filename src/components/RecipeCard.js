import styled from "styled-components";

export default function RecipeCard({ recipeData }) {
  const { label, image, totalTime, url } = recipeData.recipe;

  return (
    <StyledArticle>
      <h4>{label}</h4>
      <StyledImg src={image} height="200px" width="250px" alt="" />
      <p>{totalTime === 0 ? "Time: no data" : `Time: ${totalTime}min`}</p>
      <a href={url}>See whole recipe</a>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  padding: 20px;
  width: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  border: 1px solid black;
  border-radius: 35px;
  background-color: lightgrey;
`;

const StyledImg = styled.img`
  margin: 10px 0;
  border-radius: 20px;
`;
