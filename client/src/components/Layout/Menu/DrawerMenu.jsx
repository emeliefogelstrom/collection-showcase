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
            // Kontrollera om subMenu innehåller ett årtal (fyra siffror)
            const yearMatch = subMenu.match(/\d{4}/); // Regex för att hitta fyra siffror (årtal)

            if (yearMatch) {
              const year = parseInt(yearMatch[0], 10); // Hämta det första matchande året
              // Kolla om någon spelare har ett årtal som matchar eller ligger i närheten (decennium)
              const matches = players.some((player) =>
                player.category.some((cat) => {
                  const playerYear = parseInt(cat.sub, 10); // Omvandla spelarens årtal till heltal
                  const isInDecade =
                    Math.floor(playerYear / 10) * 10 ===
                    Math.floor(year / 10) * 10;

                  return cat.main === category.mainMenu && isInDecade;
                })
              );

              return matches; // Om någon spelare matchar
            }

            // Om det inte finns ett årtal, kontrollera om det finns exakt matchning
            const exactMatch = players.some((player) =>
              player.category.some(
                (cat) => cat.main === category.mainMenu && cat.sub === subMenu // Vi jämför direkt mot subMenu här
              )
            );

            return exactMatch; // Returnera om det finns en exakt matchning
          });

          // Om det finns några subMenu med matchande spelare, returnera den filtrerade kategorin
          if (subMenusWithPlayers.length > 0) {
            return {
              ...category,
              subMenu: subMenusWithPlayers,
            };
          }

          // Om inga subMenu har matchande spelare, returnera null
          return null;
        })
        .filter((category) => category !== null); // Ta bort kategorier utan matchande subMenu

      // Sortera kategorier och subMenu för att säkerställa ordning
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
            // Om både a och b är nummer, sortera som nummer
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }
            // Annars sortera som text
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
