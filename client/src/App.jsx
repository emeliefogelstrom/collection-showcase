import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import Main from "./components/Layout/Main";
import Login from "./components/Auth/Login";
import Home from "./components/Layout/Home";
import PageNotFound from "./components/PageNotFound";
import Players from "./components/Players/Players";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails";
import "./i18n";
import { useDispatch } from "react-redux";
import { getCategory } from "./actions/menu";
import { getPlayer } from "./actions/players";
import CookieConsent from "./CookieConsent";

/**
 * The main application component that sets up routing and global state.
 *
 * @function App
 * @returns {JSX.Element} The rendered application component.
 *
 * @example
 * <App />
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch actions to fetch players and categories
    dispatch(getPlayer());
    dispatch(getCategory());
  }, [dispatch]); // Dependency array ensures this runs only once when the component mounts

  return (
    <AuthProvider>
      <Main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/nemesis" element={<Login />} />
          <Route
            exact
            path="/players/:category,:subCategory"
            element={<Players />}
          />
          <Route exact path="/players/listPlayers" element={<Players />} />
          <Route exact path="/players/search" element={<Players />} />
          <Route exact path="/players/:id" element={<PlayerDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CookieConsent />
      </Main>
    </AuthProvider>
  );
}

export default App;
