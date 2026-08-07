// reducers/auth.js
import {
  AUTH,
  LOGOUT,
  START_LOADING,
  END_LOADING,
  AUTH_ERROR,
} from "../constants/actionTypes";

/**
 * Reducer function to manage authentication-related state.
 * Handles actions for authentication, loading states, and errors.
 *
 * @param {Object} state - The current authentication state. Default is an object with `authData`, `isLoading`, and `errors`.
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Object} The updated state based on the action type.
 */
const authReducer = (
  state = { authData: null, isLoading: false, errors: null },
  action
) => {
  switch (action.type) {
    // Stores the authentication data and clears any errors
    case AUTH:
      return {
        ...state,
        authData: action.data,
        isLoading: false,
        errors: null,
      };

    // Logs out the user by clearing the authentication data
    case LOGOUT:
      return { ...state, authData: null, isLoading: false, errors: null };

    // Sets loading state to true during authentication processes
    case START_LOADING:
      return { ...state, isLoading: true };

    // Sets loading state to false once the authentication process is complete
    case END_LOADING:
      return { ...state, isLoading: false };

    // Handles authentication errors and stores them in the state
    case AUTH_ERROR:
      return { ...state, isLoading: false, errors: action.payload };

    // Returns the current state if the action type does not match any cases
    default:
      return state;
  }
};

export default authReducer;
