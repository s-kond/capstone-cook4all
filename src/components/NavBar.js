import { NavLink } from "react-router-dom";
import styled from "styled-components";
import homeIcon from "../assets/icons/home-line.svg";
import recipesIcon from "../assets/icons/hot-meal-outline.svg";
import favoritesIcon from "../assets/icons/heart-outlined.svg";
import upArrow from "../assets/icons/arrow-up-circle.svg";
import { useEffect, useState } from "react";
import InfoModal from "./InfoModal";
import infoIcon from "../assets/icons/info-regular.svg";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
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
        {showTopBtn && (
          <StyledToTopButton type="button" onClick={() => goToTop()}>
            <img src={upArrow} alt="arrow up" />
          </StyledToTopButton>
        )}
        <StyledInfoButton
          type="button"
          title="intolerances, diets, ..."
          onClick={() => setIsModalOpen(true)}
        >
          <img src={infoIcon} alt="info" />
        </StyledInfoButton>
        <InfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </StyledNavBar>
    </>
  );
}

const StyledNavBar = styled.nav`
  position: relative;
  background-color: var(--primary-color);
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
  min-width: 320px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
`;

const StyledNavLink = styled(NavLink)`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.active {
    background-color: var(--secondary-color);
  }

  p {
    font-size: 0.9rem;
    color: black;
  }
`;

const StyledInfoButton = styled.button`
  position: absolute;
  top: -50px;
  right: 25px;
  height: 35px;
  width: 35px;
  padding: 0;
  border-radius: 100%;
  border: unset;
  background-color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledToTopButton = styled.button`
  position: absolute;
  right: 20px;
  top: -100px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  padding: 0;
  border: unset;
  background-color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
