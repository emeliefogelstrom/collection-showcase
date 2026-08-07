import * as api from "../api";
import {
  START_LOADING,
  END_LOADING,
  FETCH_PLAYERS,
  FETCH_PLAYERS_BY_MENU,
  FETCH_PLAYERS_BY_SEARCH,
  FETCH_PLAYER_DETAILS,
  DELETE_PLAYER,
  ADD_PLAYER,
  UPDATE_PLAYER,
} from "../constants/actionTypes";

/**
 * Fetches all players and dispatches the result to the Redux store.
 * @returns {function} A Redux thunk action to get players.
 */
export const getPlayer = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getPlayer();
    dispatch({ type: FETCH_PLAYERS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Fetches players based on search key and pagination.
 * @param {string} key - Search key for filtering players.
 * @param {number} page - Pagination page number.
 * @returns {function} A Redux thunk action to get players by search.
 */
export const getPlayers = (key, page) => async (dispatch) => {
  try {
    const { data } = await api.getPlayers({ key, page });
    dispatch({ type: FETCH_PLAYERS_BY_MENU, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches a player by ID and dispatches the result to the Redux store.
 * @param {string} id - The ID of the player to fetch.
 * @returns {function} A Redux thunk action to get a player by ID.
 */
export const getPlayerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getPlayerById(id);
    dispatch({ type: FETCH_PLAYER_DETAILS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Searches players based on a search query and page number.
 * @param {string} searchQuery - The search query string.
 * @param {number} page - The pagination page number.
 * @returns {function} A Redux thunk action to search players.
 */
export const getPlayersBySearch = (searchQuery, page) => async (dispatch) => {
  try {
    const { data } = await api.getPlayersBySearch({ searchQuery, page });
    dispatch({ type: FETCH_PLAYERS_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a new player and dispatches the result to the Redux store.
 * @param {Object} player - The player data to add.
 * @returns {function} A Redux thunk action to add a player.
 */
export const addPlayer = (player) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addPlayer(player);
    dispatch({ type: ADD_PLAYER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Updates an existing player by ID and dispatches the result to the Redux store.
 * @param {string} id - The ID of the player to update.
 * @param {Object} player - The updated player data.
 * @returns {function} A Redux thunk action to update a player.
 */
export const updatePlayer = (id, player) => async (dispatch) => {
  try {
    const { data } = await api.updatePlayer(id, player);
    dispatch({ type: UPDATE_PLAYER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Deletes a player by ID and dispatches the result to the Redux store.
 * @param {string} id - The ID of the player to delete.
 * @returns {function} A Redux thunk action to delete a player.
 */
export const deletePlayer = (id) => async (dispatch) => {
  try {
    await api.deletePlayer(id);
    dispatch({ type: DELETE_PLAYER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
