// reducers/index.js
import { combineReducers } from "redux";

import players from "./players";
import auth from "./auth";
import menus from "./menus";

export const reducers = combineReducers({ players, auth, menus });
