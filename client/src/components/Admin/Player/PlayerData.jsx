//PlayerData.js
import React from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";

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
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="name"
          label="Name"
          variant="outlined"
          value={playerData.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="club"
          label="Club"
          variant="outlined"
          value={playerData.club}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          style={{
            width: "100%",
            border: "1px solid #c4c4c4",
            borderRadius: "4px",
            padding: "8px",
            fontFamily: "Roboto, sans-serif",
          }}
          name="infoEnglish"
          placeholder="Info (English)"
          minRows={3}
          value={playerData.infoEnglish}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          style={{
            width: "100%",
            border: "1px solid #c4c4c4",
            borderRadius: "4px",
            padding: "8px",
            fontFamily: "Roboto, sans-serif",
          }}
          name="infoNorwegian"
          placeholder="Info (Norwegian)"
          minRows={3}
          value={playerData.infoNorwegian}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}

export default PlayerData;
