import express from "express";
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  getCategory,
  getMenuCategory,
} from "../controllers/menu.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addCategory", auth, addCategory);
router.post("/addSubCategory", auth, addSubCategory);
router.delete("/deleteCategory/:id", auth, deleteCategory);
router.delete("/deleteSubCategory", auth, deleteSubCategory);
router.get("/getCategory", getCategory);
router.get("/getMenuCategory", getMenuCategory);

export default router;