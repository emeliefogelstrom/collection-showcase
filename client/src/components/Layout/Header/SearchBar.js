import React, { useCallback, useState } from "react";
import DOMPurify from "dompurify";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  SearchInput,
  SearchIconWrapper,
  SearchWrapper,
  MobileSearchIconStyled,
  MobileSearchIconWrapper,
  DialogStyled,
  DialogContentStyled,
} from "./styles";
import { IconButton } from "@mui/material";

const SearchBar = ({ search, setSearch, handleKeyPress }) => {
  const [open, setOpen] = useState(false);

  const handleSearchChange = useCallback(
    (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setSearch(sanitizedValue);
    },
    [setSearch]
  );

  const toggleDialog = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleMobileKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        handleKeyPress(e);
        setOpen(false);
      }
    },
    [handleKeyPress]
  );

  return (
    <>
      {/* Desktop Search */}
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onKeyDown={handleKeyPress}
          onChange={handleSearchChange}
        />
      </SearchWrapper>

      {/* Mobile Search */}
      <MobileSearchIconWrapper>
        <IconButton onClick={toggleDialog} aria-label="Open search">
          <MobileSearchIconStyled />
        </IconButton>
      </MobileSearchIconWrapper>

      {/* Dialog for Mobile */}
      <DialogStyled open={open} onClose={toggleDialog}>
        <DialogContentStyled>
          <IconButton onClick={toggleDialog} aria-label="Close search">
            <CloseIcon />
          </IconButton>
          <SearchInput
            autoFocus
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onKeyDown={handleMobileKeyPress}
            onChange={handleSearchChange}
          />
        </DialogContentStyled>
      </DialogStyled>
    </>
  );
};

export default SearchBar;
