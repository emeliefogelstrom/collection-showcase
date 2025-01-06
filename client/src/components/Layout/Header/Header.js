import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DrawerMenu from "../Menu/DrawerMenu";
import LanguageToggle from "../Menu/LanguageToggle";
import { useAuth } from "../../Auth/AuthContext";
import Title from "./Title";
import SearchBar from "./SearchBar";
import LogoutButton from "./LogoutButton";
import {
  Root,
  AppBarStyled,
  ToolbarStyled,
  SearchLanguageWrapper,
} from "./styles"; // Import styles

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const category = useSelector((state) => state.menus);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  const searchPlayer = useCallback(() => {
    if (search.trim()) {
      navigate(`/players/search?searchQuery=${search}&page=1`);
    } else {
      navigate("/");
    }
  }, [navigate, search]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        searchPlayer();
        setSearch("");
      }
    },
    [searchPlayer]
  );

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      logout();
      navigate("/");
    },
    [logout, navigate]
  );

  if (loading) return <p>Loading...</p>;

  const menuItems = isAuthenticated
    ? category
    : category.filter((menu) => menu.subMenu.length > 0);

  return (
    <Root>
      <AppBarStyled position="static" location={location}>
        <ToolbarStyled>
          <DrawerMenu
            categories={menuItems}
            isAuthenticated={isAuthenticated}
          />
          <Title />
          <SearchLanguageWrapper>
            <SearchBar
              search={search}
              setSearch={setSearch}
              handleKeyPress={handleKeyPress}
            />
            <LanguageToggle />
          </SearchLanguageWrapper>
          {isAuthenticated && <LogoutButton handleLogout={handleLogout} />}
        </ToolbarStyled>
      </AppBarStyled>
    </Root>
  );
};

export default Header;
