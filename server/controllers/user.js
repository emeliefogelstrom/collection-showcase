// controllers/user.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

// Function to validate token
export const validateToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT);
    return res.status(200).json(decoded);
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Handles user sign-in.
 *
 * @param {object} req - The request object containing username and password in the body.
 * @param {object} res - The response object for sending responses.
 */
export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName: username });

    // Check if user exists
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Compare provided password with hashed password
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { userName: existingUser.userName, id: existingUser._id },
      process.env.JWT,
      { expiresIn: "24h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Handles user sign-out.
 *
 * @param {object} req - The request object for sign-out.
 * @param {object} res - The response object for sending responses.
 */
export const signout = async (req, res) => {
  // Logout is handled client-side by removing the jwtToken cookie
  // (see AuthContext.jsx). This endpoint exists as a place to add
  // server-side token invalidation (e.g. a blacklist) in the future.
  res.status(200).json({ message: "Logout successful" });
};

