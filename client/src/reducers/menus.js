import {
  FETCH_MENU,
  CREATE_MENU,
  ADD_SUBMENU,
  FETCH_CATEGORIES,
  DELETE_CATEGORY,
  DELETE_SUBCATEGORY,
} from "../constants/actionTypes";

/**
 * Reducer function to manage menu-related state.
 * Handles actions for fetching, creating, and deleting menus and categories.
 *
 * @param {Array} menus - The current state of the menus (default is an empty array).
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Array} The updated state based on the action type.
 */
const menusReducer = (menus = [], action) => {
  switch (action.type) {
    // Updates the state with the fetched menu data
    case FETCH_MENU:
      return action.payload;

    case CREATE_MENU:
      return action.payload; // Lägg till hela nya mainMenu

    // Adds a sub menu to the current state
    case ADD_SUBMENU:
      const updatedSubMenu = menus.map((menu) =>
        menu.mainMenu === action.payload.mainMenu
          ? { ...menu, subMenu: action.payload.subMenu } // Ersätt subMenu för rätt mainMenu
          : menu
      );
      return updatedSubMenu;

    // Updates the state with fetched categories
    case FETCH_CATEGORIES:
      return action.payload;

    // Removes a category from the state based on the action payload (category ID)
    case DELETE_CATEGORY:
      return action.payload;

    case DELETE_SUBCATEGORY:
      return action.payload;

    // Default case returns the current state if action type doesn't match
    default:
      return menus;
  }
};

export default menusReducer;
