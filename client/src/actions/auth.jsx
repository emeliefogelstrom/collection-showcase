// auth.js (actions)
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