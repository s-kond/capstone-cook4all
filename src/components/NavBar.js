import { NavLink } from "react-router-dom";
import styled from "styled-components";
import homeIcon from "../assets/icons/home-line.svg";
import recipesIcon from "../assets/icons/hot-meal-outline.svg";
import favoritesIcon from "../assets/icons/heart-outlined.svg";
import upArrow from "../assets/icons/arrow-up-circle.svg";
import { useEffect, useState } from "react";
import InfoModal from "./InfoModal";
import ProfileMenu from "./ProfileMenu";
import userIcon from "../assets/icons/user-profile-outline.svg";

export default function NavBar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
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
        <StyledProfileButton
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        >
          <img src={userIcon} alt="user" />
          <p>Account</p>
        </StyledProfileButton>
        <ProfileMenu
          isProfileMenuOpen={isProfileMenuOpen}
          setIsProfileMenuOpen={setIsProfileMenuOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
        <InfoModal
          isInfoModalOpen={isInfoModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
        {showTopBtn && (
          <StyledToTopButton
            type="button"
            onClick={goToTop}
            isProfileMenuOpen={isProfileMenuOpen}
          >
            <img src={upArrow} alt="arrow up" />
          </StyledToTopButton>
        )}
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

const StyledProfileButton = styled.button`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: var(--primary-color);
  border: unset;
  cursor: pointer;

  &.active {
    background-color: var(--secondary-color);
  }

  p {
    margin-top: 2px;
    font-size: 0.9rem;
    color: black;
  }
`;

const StyledToTopButton = styled.button`
  display: ${({ isProfileMenuOpen }) => isProfileMenuOpen && "none"};
  position: absolute;
  top: -50px;
  right: 20px;
  border-radius: 100%;
  padding: 0;
  border: unset;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
