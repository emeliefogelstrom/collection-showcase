// routes/users.js
import express from "express";
import { validateToken, signin, signout } from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/validateToken", validateToken);
router.post("/signout", signout);
router.post("/signin", signin);

// Endpoints that require authentication
router.get("/secure-data", authMiddleware, (req, res) => {
  // This code requires the user to be logged in
  res.json({ message: "This is secure data." });
});

export default router;
