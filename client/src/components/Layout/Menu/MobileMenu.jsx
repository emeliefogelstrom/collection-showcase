import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSubCategory from "../../Admin/Category/AddSubCategory";
import DeleteCategory from "../../Admin/Category/DeleteCategory";
import DeleteSubCategory from "../../Admin/Category/DeleteSubCategory";
import ScrollDialog from "../../dialog";

const MobileMenu = ({ categories, isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const navigate = useNavigate();
  const players = useSelector((state) => state.players.players);

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

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
  const handleDeleteSubCategoryClick = (_id, subItem) => {
    handleOpenDialog(
      <DeleteSubCategory
        mainCategory={_id}
        subCategory={subItem}
        handleCloseDialog={handleCloseDialog}
      />
    );
  };

  const listPlayer = (main, sub) => {
    navigate(`/players/listPlayers?key=${[main, sub].join(",")}&page=1`);
    setOpen(false);
  };

  // Kopierad filtreringslogik från DrawerMenu
  const filterCategories = useCallback(
    (filtCat) => {
      const filteredCategories = filtCat
        .map((category) => {
          const subMenusWithPlayers = category.subMenu.filter((subMenu) => {
            const yearMatch = subMenu.match(/\d{4}/);
            if (yearMatch) {
              const year = parseInt(yearMatch[0], 10);
              const matches = players.some((player) =>
                player.category.some((cat) => {
                  const playerYear = parseInt(cat.sub, 10);
                  const isInDecade =
                    Math.floor(playerYear / 10) * 10 ===
                    Math.floor(year / 10) * 10;
                  return cat.main === category.mainMenu && isInDecade;
                })
              );
              return matches;
            }
            const exactMatch = players.some((player) =>
              player.category.some(
                (cat) => cat.main === category.mainMenu && cat.sub === subMenu
              )
            );
            return exactMatch;
          });

          if (subMenusWithPlayers.length > 0) {
            return { ...category, subMenu: subMenusWithPlayers };
          }
          return null;
        })
        .filter((category) => category !== null);

      // Sortera subMenu och kategorier
      const sortedCategories = filteredCategories
        .map((category) => ({
          ...category,
          subMenu: category.subMenu.sort((a, b) => a.localeCompare(b)),
        }))
        .sort((a, b) => a.mainMenu.localeCompare(b.mainMenu));

      return sortedCategories;
    },
    [players]
  );

  const displayedCategories = isAuthenticated
    ? categories
    : filterCategories(categories);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="text-white"
      >
        <Menu size={24} />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 p-4 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Meny</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X size={28} className="text-gray-900" />
                </Button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto">
                {isAuthenticated && (
                  <div className="flex justify-start mb-2">
                    <Button
                      variant="outlined"
                      size="sm"
                      className="border border-gray-400 text-gray-900 px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Add new category
                    </Button>
                  </div>
                )}

                {displayedCategories.map(({ _id, mainMenu, subMenu }) => (
                  <div key={_id}>
                    <div className="flex justify-between items-center">
                      <h3
                        className="font-semibold text-gray-900 cursor-pointer"
                        onClick={() =>
                          setExpandedMenu(expandedMenu === _id ? null : _id)
                        }
                      >
                        {mainMenu}
                      </h3>
                      {isAuthenticated && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleAddSubCategoryClick(mainMenu)}
                          >
                            <AddIcon className="w-6 h-6 text-gray-900" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteCategoryClick(mainMenu, _id)
                            }
                          >
                            <DeleteIcon className="w-6 h-6 text-gray-900" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {expandedMenu === _id && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {subMenu.map((subItem, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <button
                              onClick={() => listPlayer(mainMenu, subItem)}
                              className="text-gray-700 hover:text-primary transition"
                            >
                              {subItem}
                            </button>
                            {isAuthenticated && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDeleteSubCategoryClick(_id, subItem)
                                }
                              >
                                <DeleteIcon className="w-5 h-5 text-gray-900" />
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <ScrollDialog open={openDialog} onClose={handleCloseDialog}>
                {dialogContent}
              </ScrollDialog>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
