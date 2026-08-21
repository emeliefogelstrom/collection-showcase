import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddCategory from "../../Admin/Category/AddCategory";
import AddSubCategory from "../../Admin/Category/AddSubCategory";
import DeleteCategory from "../../Admin/Category/DeleteCategory";
import DeleteSubCategory from "../../Admin/Category/DeleteSubCategory";
import ScrollDialog from "../../dialog";

import {
  StyledButton,
  MainMenuContainer,
  MainMenuItem,
  SubMenuItem,
  AddCategoryButton,
  CloseMenuButton,
} from "./styles";

const DrawerMenu = ({ categories, isAuthenticated }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const navigate = useNavigate();
  const players = useSelector((state) => state.players.players);

  const filterCategories = useCallback(
    (filtCat) => {
      const filteredCategories = filtCat
        .map((category) => {
          const subMenusWithPlayers = category.subMenu.filter((subMenu) => {
            // Check if subMenu contains a year (four digits)
            const yearMatch = subMenu.match(/\d{4}/); // Regex to find four digits (year)

            if (yearMatch) {
              const year = parseInt(yearMatch[0], 10); // Get the first matching year
              // Check if any player has a matching year or one in the same decade
              const matches = players.some((player) =>
                player.category.some((cat) => {
                  const playerYear = parseInt(cat.sub, 10); // Convert the player's year to an integer
                  const isInDecade =
                    Math.floor(playerYear / 10) * 10 ===
                    Math.floor(year / 10) * 10;

                  return cat.main === category.mainMenu && isInDecade;
                })
              );

              return matches; // If any player matches
            }

            // If there's no year, check for an exact match instead
            const exactMatch = players.some((player) =>
              player.category.some(
                (cat) => cat.main === category.mainMenu && cat.sub === subMenu // We compare directly against subMenu here
              )
            );

            return exactMatch; // Return whether there's an exact match
          });

          // If there are any subMenus with matching players, return the filtered category
          if (subMenusWithPlayers.length > 0) {
            return {
              ...category,
              subMenu: subMenusWithPlayers,
            };
          }

          // If no subMenus have matching players, return null
          return null;
        })
        .filter((category) => category !== null); // Remove categories with no matching subMenu

      // Sort categories and subMenus to ensure consistent order
      const sortedCategories = [...filteredCategories]
        .map((category) => ({
          ...category,
          subMenu: category.subMenu.sort((a, b) => a.localeCompare(b)),
        }))
        .sort((a, b) => a.mainMenu.localeCompare(b.mainMenu));

      return sortedCategories;
    },
    [players]
  );

  useEffect(() => {
    if (isAuthenticated) {
      const sortedCategories = [...categories]
        .map((category) => ({
          ...category,
          subMenu: [...category.subMenu].sort((a, b) => {
            // If both a and b are numbers, sort numerically
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }
            // Otherwise sort as text
            return a.localeCompare(b);
          }),
        }))
        .sort((a, b) => a.mainMenu.localeCompare(b.mainMenu));

      setMenu(sortedCategories);
    } else {
      setMenu(filterCategories(categories));
    }
  }, [categories, filterCategories, isAuthenticated]);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddCategoryClick = () => {
    handleOpenDialog(<AddCategory handleCloseDialog={handleCloseDialog} />);
  };

  const handleAddSubCategoryClick = (mainMenu) => {
    handleOpenDialog(
      <AddSubCategory
        mainCategory={mainMenu}
        handleCloseDialog={handleCloseDialog}
      />
    );
  };

  const handleDeleteCategoryClick = (mainMenu, _id) => {
    handleOpenDialog(
      <DeleteCategory
        category={mainMenu}
        id={_id}
        handleCloseDialog={handleCloseDialog}
      />
    );
  };

  const handleDeleteSubCategoryClick = (mainMenu, subItem) => {
    handleOpenDialog(
      <DeleteSubCategory
        mainCategory={mainMenu}
        subCategory={subItem}
        handleCloseDialog={handleCloseDialog}
      />
    );
  };

  const listPlayer = (e, mainMenu, sub) => {
    e.preventDefault();
    navigate(`/players/listPlayers?key=${[mainMenu, sub].join(",")}&page=1`, {
      replace: true,
    });
    handleDrawerClose();
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
        <CloseMenuButton onClick={handleDrawerClose}>
          <CloseIcon />
        </CloseMenuButton>
        {isAuthenticated && (
          <ListItem className={AddCategoryButton}>
            <StyledButton
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleAddCategoryClick}
            >
              Add new category
            </StyledButton>
          </ListItem>
        )}
        <MainMenuContainer>
          {menu.map(({ _id, mainMenu, subMenu }) => (
            <div key={_id}>
              <MainMenuItem>
                <ListItemText primary={mainMenu} />
                {isAuthenticated && (
                  <div>
                    <IconButton
                      onClick={() => handleAddSubCategoryClick(mainMenu)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCategoryClick(mainMenu, _id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </MainMenuItem>
              <List disablePadding>
                {subMenu.map((subItem, index) => (
                  <SubMenuItem
                    key={`${subItem || ""}-${index}`}
                    button
                    onClick={(e) => listPlayer(e, mainMenu, subItem)}
                  >
                    <ListItemText primary={subItem || ""} />
                    {isAuthenticated && (
                      <IconButton
                        onClick={() =>
                          handleDeleteSubCategoryClick(_id, subItem)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </SubMenuItem>
                ))}
              </List>
            </div>
          ))}
        </MainMenuContainer>
      </Drawer>
      <ScrollDialog open={openDialog} onClose={handleCloseDialog}>
        {dialogContent}
      </ScrollDialog>
    </div>
  );
};

export default DrawerMenu;