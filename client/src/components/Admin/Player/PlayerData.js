//PlayerData.js
import React from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

/**
 * Component for displaying and editing player data.
 *
 * @component
 * @param {object} props - The properties for the PlayerData component.
 * @param {object} props.playerData - The current player data, including name, club, and info in multiple languages.
 * @param {function} props.handleInputChange - Function to handle input changes in the form.
 * @returns {JSX.Element} The rendered player data form.
 */
function PlayerData({ playerData, handleInputChange }) {
  return (
    <div>
      <TextField
        fullWidth
        name="name"
        label="Name"
        variant="outlined"
        value={playerData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        name="club"
        label="Club"
        variant="outlined"
        value={playerData.club}
        onChange={handleInputChange}
      />
      <TextareaAutosize
        fullWidth
        name="infoEnglish"
        placeholder="Info (English)"
        minRows={3}
        value={playerData.infoEnglish}
        onChange={handleInputChange}
      />
      <TextareaAutosize
        fullWidth
        name="infoNorwegian"
        placeholder="Info (Norwegian)"
        minRows={3}
        value={playerData.infoNorwegian}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default PlayerData;
