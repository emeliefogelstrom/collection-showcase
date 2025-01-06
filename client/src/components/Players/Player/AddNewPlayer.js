import React, { useCallback } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import image from "../../../images/profile.png";
import {
  Card as StyledCard,
  StyledCardMedia,
  Overlay as StyledOverlay,
} from "./styles"; // Importera de nya stilarna
import ScrollDialog from "../../dialog";
import PlayerForm from "../../Admin/Player/PlayerForm";
import { addPlayer } from "../../../actions/players";

/**
 * AddNewPlayer component allows users to add a new player
 * by providing a form to input player details.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleOpenDialog - Function to open the dialog for adding a new player.
 * @param {function} props.handleCloseDialog - Function to close the dialog after the player has been added.
 * @param {boolean} props.openDialog - A boolean indicating if the dialog is currently open.
 * @returns {JSX.Element} The rendered AddNewPlayer component.
 */
const AddNewPlayer = ({ handleOpenDialog, handleCloseDialog, openDialog }) => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (updatedPlayerData) => {
      const data = new FormData();

      data.append("name", updatedPlayerData.name);
      data.append("club", updatedPlayerData.club);
      data.append("infoEnglish", updatedPlayerData.infoEnglish);
      data.append("infoNorwegian", updatedPlayerData.infoNorwegian);

      let categoriesToSend = [];

      if (updatedPlayerData.category) {
        if (Array.isArray(updatedPlayerData.category)) {
          categoriesToSend = updatedPlayerData.category;
        } else {
          categoriesToSend = [updatedPlayerData.category];
        }
      }

      const selectedCategoriesToSend = categoriesToSend.map((subCategory) => ({
        main: subCategory.main,
        sub: subCategory.sub,
      }));

      data.append("categories", JSON.stringify(selectedCategoriesToSend));

      updatedPlayerData.images.forEach((img) => {
        data.append("images", img);
      });

      dispatch(addPlayer(data));
    },
    [dispatch]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        handleOpenDialog();
      }
    },
    [handleOpenDialog]
  );

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard raised elevation={6}>
        <StyledCardMedia
          src={image}
          alt="Add New Player"
          onClick={handleOpenDialog}
        />
        <StyledOverlay
          onClick={handleOpenDialog}
          role="button"
          tabIndex={0}
          aria-label="Add New Player"
          onKeyDown={handleKeyDown}
        >
          <Typography variant="h6">Add New Player</Typography>
        </StyledOverlay>
        <ScrollDialog
          title="Add New Player"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <PlayerForm
            handleSubmit={handleSubmit}
            handleCloseUpdatePlayer={handleCloseDialog}
          />
        </ScrollDialog>
      </StyledCard>
    </Grid>
  );
};

export default AddNewPlayer;
