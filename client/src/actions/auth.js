// auth.js (actions)
import Cookies from "js-cookie";
import {
  AUTH,
  START_LOADING,
  END_LOADING,
  AUTH_ERROR,
} from "../constants/actionTypes";
import * as api from "../api";

/**
 * Asynchronously validates a user's token to determine its validity.
 *
 * @async
 * @function validateToken
 * @returns {Promise<Object|null>} Resolves to the response data if the token is valid,
 *                                 or `null` if validation fails or an error occurs.
 * @throws {Error} Logs an error message and returns `null` in case of failure.
 */
export const validateToken = async () => {
  try {
    const response = await api.validateToken();
    return response.data;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
};

/**
 * Asynchronously handles user signup, stores the authentication token in cookies,
 * updates the Redux state, and navigates the user to the home page upon success.
 *
 * @async
 * @function signup
 * @param {Object} formData - The user data for signup, such as email and password.
 * @param {function} router - A function to navigate the user to different routes (e.g., React Router's `useNavigate`).
 * @returns {function} A Redux thunk action that performs the signup process and dispatches relevant actions.
 * @throws {Error} Throws an error if the signup process fails.
 */
export const signup = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signUp(formData);

    // Store JWT token in cookies with a 7-day expiration
    Cookies.set("jwtToken", data.token, { expires: 7 });

    // Dispatch authentication data to Redux store
    dispatch({ type: AUTH, data });
    dispatch({ type: END_LOADING });

    router("/");
  } catch (error) {
    console.error("Error in signup action:", error);

    dispatch({ type: AUTH_ERROR, payload: error.message });
    dispatch({ type: END_LOADING });

    throw new Error("Signup failed");
  }
};
