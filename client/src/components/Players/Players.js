import React, { useState, useMemo, useCallback } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AddNewPlayer from "./Player/AddNewPlayer";
import Player from "./Player/Player";
import Paginate from "../Pagination/Pagination";
import { styled } from "@mui/system"; // Importera styled
import { useAuth } from "../Auth/AuthContext";

/**
 * useQuery is a custom hook that parses the query string from the current URL.
 *
 * @returns {URLSearchParams} The parsed query parameters.
 */
function useQuery() {
  const location = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params;
  }, [location.search]);
}

/**
 * Players component displays a list of players, allowing users to filter and view details.
 *
 * @returns {JSX.Element} The rendered Players component.
 */
const Players = () => {
  const { isLoading, filteredPlayers } = useSelector((state) => state.players);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterOption, setFilterOption] = useState(10);
  const isAuthenticated = useAuth().isAuthenticated;
  const query = useQuery();
  const page = query.get("page") || 1;

  const handleChange = useCallback((event) => {
    setFilterOption(event.target.value);
  }, []);

  const sortedPlayers = useMemo(() => {
    const playersCopy = [...filteredPlayers];

    switch (filterOption) {
      case 10: // Filtrera efter år
        return playersCopy.sort((a, b) => {
          const yearA = a.category[0]?.sub || 0;
          const yearB = b.category[0]?.sub || 0;
          return yearA - yearB;
        });
      case 20: // Filtrera efter namn
        return playersCopy.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );
      case 30: // Filtrera efter klubb
        return playersCopy.sort((a, b) =>
          a.club.localeCompare(b.club, undefined, { sensitivity: "base" })
        );
      default:
        return playersCopy; // Standard
    }
  }, [filteredPlayers, filterOption]);

  const handleOpenDialog = useCallback(() => {
    if (isAuthenticated) {
      setOpenDialog(true);
    }
  }, [isAuthenticated]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  if (isLoading || !filteredPlayers) {
    return <CircularProgress />;
  }

  return (
    <Root container direction="column" spacing={3}>
      {/* Rad för filtreringsknappen */}
      <Grid item container justifyContent="flex-end" alignItems="center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filterOption}
            onChange={handleChange}
            label="Filtrer"
          >
            <MenuItem value={10}>Årtall</MenuItem>
            <MenuItem value={20}>Navn</MenuItem>
            <MenuItem value={30}>Klubb</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Rad för spelarkorten */}
      <Grid item container alignItems="stretch" spacing={3}>
        {sortedPlayers.map((player) => (
          <Grid key={player._id} item xs={12} sm={6} md={4}>
            <Player player={player} />
          </Grid>
        ))}
        {isAuthenticated && (
          <AddNewPlayer
            handleOpenDialog={handleOpenDialog}
            handleCloseDialog={handleCloseDialog}
            openDialog={openDialog}
          />
        )}
      </Grid>

      {/* Paginations-komponenten */}
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <Paginate page={page} searchParams={query} />
        </Grid>
      </Grid>
    </Root>
  );
};

// Styled component for the root container
const Root = styled(Grid)({
  marginTop: "2rem",
  marginBottom: "2rem",
});

export default Players;
