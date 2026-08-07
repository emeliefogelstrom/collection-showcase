"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { deletePlayer, updatePlayer } from "../../actions/players";
import PlayerForm from "../Admin/Player/PlayerForm";
import { useAuth } from "../Auth/AuthContext";
import ScrollDialog from "../dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";

export function ExpandableCardDemo({ cards }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const id = useId();
  const { i18n } = useTranslation();
  const ref = useRef(null);
  const { isAuthenticated } = useAuth();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const onClickUpdate = () => {
    alert("Update!");
  };

  const handleOpenUpdateDialog = useCallback((playerCard) => {
    setSelectedCard(playerCard);
    setOpenUpdateDialog(true);
  }, []);

  const handleCloseUpdateDialog = useCallback(() => {
    setSelectedCard(null);
    setOpenUpdateDialog(false);
  }, []);

  const handleOpenDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const handleDeletePlayer = useCallback(() => {
    dispatch(deletePlayer(cards._id));
    setOpenDeleteDialog(false);
  }, [dispatch, cards._id]);

  const handleSubmit = useCallback(
    (updatedPlayerData) => {
      const data = new FormData();

      data.append("name", updatedPlayerData.name);
      data.append("club", updatedPlayerData.club);
      data.append("infoEnglish", updatedPlayerData.infoEnglish);
      data.append("infoNorwegian", updatedPlayerData.infoNorwegian);
      data.append("categories", JSON.stringify(updatedPlayerData.category));

      updatedPlayerData.images.forEach((image) => {
        data.append("images", image);
      });

      dispatch(updatePlayer(cards._id, data));
    },
    [dispatch, cards._id]
  );

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className={`relative p-1 rounded-3xl w-[40vh] md:w-[120vh] max-w-[900px] max-h-[75vh] h-[100vh] md:h-[500px] flex flex-col md:flex-row dark:bg-neutral-900 overflow-hidden ${cardStyle}`}
            >
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="w-full md:w-2/5 md:h-full overflow-hidden pt-4"
              >
                <AnimatedTestimonials images={active.images} />
              </motion.div>

              <div className="w-full md:w-3/5 max-h-[40vh] md:max-h-[55vh] p-4 flex flex-col md:justify-between">
                <div className="bg-white bg-opacity-45 p-10 rounded-lg h-full overflow-y-auto">
                  <motion.h3
                    layoutId={`title-${active.name}-${id}`}
                    className="font-medium text-neutral-700 text-[20px]"
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${
                      i18n.language === "no"
                        ? active.infoNorwegian
                        : active.infoEnglish
                    }-${id}`}
                    className="text-neutral-600  text-base pt-5"
                  >
                    {i18n.language === "no"
                      ? active.infoNorwegian
                      : active.infoEnglish}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 items-start gap-6">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={card.name}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col bg-gradient-to-br from-slate-400 to-slate-500 border border-slate-500 hover:border-slate-600 hover:shadow-xl hover:scale-105 transition duration-300 dark:border-neutral-700 dark:hover:border-neutral-600 rounded-xl cursor-pointer"
          >
            <div className="flex gap-2 flex-col  w-full">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.images[0]}
                  alt={card.name}
                  className="h-[30vh] w-full  rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col relative">
                <div className="absolute top-0 left-4">
                  <p
                    layoutId={`club-${card.club}-${id}`}
                    className="text-neutral-600 text-base"
                  >
                    {card.club}
                  </p>
                </div>

                <div className="absolute top-0 right-4">
                  <p
                    layoutId={`category-${card.category[0].sub}-${id}`}
                    className="text-neutral-600 text-base"
                  >
                    {card.category[0].sub}
                  </p>
                </div>

                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="w-full font-medium text-neutral-800 pl-4 text-left text-xl mt-5"
                >
                  {card.name}
                </motion.h3>
                {isAuthenticated && (
                  <div className="flex justify-between w-full mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenUpdateDialog(card);
                      }}
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
                    >
                      <UpdateIcon fontSize="small" /> Update
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog();
                      }}
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
                    >
                      <DeleteIcon fontSize="small" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
      <ScrollDialog
        title="Update Player"
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
      >
        {selectedCard && (
          <PlayerForm
            player={selectedCard}
            handleSubmit={handleSubmit}
            handleCloseUpdatePlayer={handleCloseUpdateDialog}
          />
        )}
      </ScrollDialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </button>
          <button onClick={handleDeletePlayer} color="secondary">
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cardStyle = [
  "bg-gradient-to-br from-slate-200 via-slate-400 to-[#1f262d] border-4 border-slate-500 shadow-[0_0_25px_rgba(173,216,230,0.6)]",
];
