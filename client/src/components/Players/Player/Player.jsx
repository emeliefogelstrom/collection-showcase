import React, { useCallback, useState } from "react";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import ScrollDialog from "../../dialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePlayer, updatePlayer } from "../../../actions/players";
import PlayerForm from "../../Admin/Player/PlayerForm";
import { useAuth } from "../../Auth/AuthContext";

// Importera de nya stylade komponenterna
import {
  Card,
  CardActions as StyledCardActions,
  TextActions,
  Name,
  Club,
  Year,
  StyledCardMedia,
} from "./styles";

/**
 * Player component displays the details of a single player,
 * including the player's name, club, and images, as well as
 * functionality for updating and deleting the player.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.player - The player object containing player details.
 * @returns {JSX.Element} The rendered Player component.
 */
const Player = ({ player }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isAuthenticated } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdatePlayer, setOpenUpdatePlayer] = useState(false);

  const handleOpenUpdatePlayer = useCallback(() => {
    setOpenUpdatePlayer(true);
  }, []);

  const handleCloseUpdatePlayer = useCallback(() => {
    setOpenUpdatePlayer(false);
  }, []);

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleDeletePlayer = useCallback(() => {
    dispatch(deletePlayer(player._id));
    setOpenDialog(false);
  }, [dispatch, player._id]);

  const openPlayer = useCallback(() => {
    history(`/players/${player._id}`, { redirect: true });
  }, [history, player._id]);

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

      dispatch(updatePlayer(player._id, data));
    },
    [dispatch, player._id]
  );

  return (
    <Card raised elevation={6}>
      <ButtonBase
        component="span"
        onClick={openPlayer}
        sx={{
          display: "block",
          width: "100%",
          textAlign: "inherit",
        }}
      >
        <StyledCardMedia src={player.images[0]} alt={player.name} />
        <TextActions>
          <Club variant="h6">{player.club}</Club>
          <Year variant="h6">{player.category[0].sub}</Year>
        </TextActions>
        <Name>{player.name}</Name>
      </ButtonBase>
      <StyledCardActions>
        <ScrollDialog
          title="Update Player"
          open={openUpdatePlayer}
          onClose={handleCloseUpdatePlayer}
        >
          <PlayerForm
            player={player}
            handleSubmit={handleSubmit}
            handleCloseUpdatePlayer={handleCloseUpdatePlayer}
          />
        </ScrollDialog>
        {isAuthenticated && (
          <>
            <Button
              size="small"
              color="primary"
              onClick={handleOpenUpdatePlayer}
            >
              <UpdateIcon fontSize="small" /> &nbsp; Update
            </Button>
            <Button size="small" color="secondary" onClick={handleOpenDialog}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          </>
        )}
      </StyledCardActions>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {player.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePlayer} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Player;
