import { NavLink } from "react-router-dom";
import styled from "styled-components";
import homeIcon from "../assets/icons/home-line.svg";
import recipesIcon from "../assets/icons/hot-meal-outline.svg";
import favoritesIcon from "../assets/icons/heart-outlined.svg";

export default function NavBar() {
  return (
    <StyledNavBar>
      <StyledNavLink to="/" end>
        <img src={homeIcon} alt="Go to Home" />
        <p>Home</p>
      </StyledNavLink>
      <StyledNavLink to="/recipes">
        <img src={recipesIcon} alt="Go to Recipes" />
        <p>Recipes</p>
      </StyledNavLink>
      <StyledNavLink to="/favorites">
        <img src={favoritesIcon} alt="Go to favorite recipes" />
        <p>Favorites</p>
      </StyledNavLink>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  background-color: var(--primary-color);
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
`;

const StyledNavLink = styled(NavLink)`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.active {
    background-color: rgb(192, 218, 241);
  }

  p {
    font-size: 0.9rem;
    color: black;
  }
`;
