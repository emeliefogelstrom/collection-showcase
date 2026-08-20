// controllers/menu.js
import express from "express";
import mongoose from "mongoose";
import Menu from "../models/Menu.js";

const router = express.Router();

/**
 * Adds a new category to the menu.
 * Checks if the category already exists before adding.
 *
 * @param {object} req - The request object containing the new category in the body.
 * @param {object} res - The response object for sending responses.
 */
export const addCategory = (req, res) => {
  Menu.findOne({ mainMenu: req.body.newCategory }).then(async (menu) => {
    if (menu) {
      return res.status(404).json("Category already exists");
    }

    const newCategory = new Menu({ mainMenu: req.body.newCategory });

    try {
      const savedCategory = await newCategory.save();
      // Hämta hela menyn (eller alla menyer) efter att den nya kategorin har sparats
      const updatedMenu = await Menu.find(); // Hämta alla menyer för att uppdatera frontend
      return res.json(updatedMenu); // Skicka tillbaka hela menyn
    } catch (err) {
      console.error("Error: ", err);
      return res.status(400).json("Error: " + err);
    }
  });
};

/**
 * Adds a new sub-category to an existing category.
 *
 * @param {object} req - The request object containing category and new sub-category in the body.
 * @param {object} res - The response object for sending responses.
 */
export const addSubCategory = async (req, res) => {
  try {
    const menu = await Menu.findOneAndUpdate(
      { mainMenu: req.body.category },
      { $addToSet: { subMenu: req.body.newSubCategory } },
      { new: true }
    );

    if (!menu) {
      return res.status(404).send({ message: "Menu not found" });
    }

    return res.status(200).send(menu);
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).send({ message: "Error updating menu" });
  }
};

/**
 * Deletes a category by its ID.
 *
 * @param {object} req - The request object containing the category ID in params.
 * @param {object} res - The response object for sending responses.
 */
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No category with that id");
    }

    const deletedCategory = await Menu.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send("Category not found");
    }

    // Hämta hela uppdaterade menyn eller lista
    const updatedMenu = await Menu.find();
    res.json(updatedMenu);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
};

/**
 * Deletes a sub-category from a category.
 *
 * @param {object} req - The request object containing category ID and sub-category name in the body.
 * @param {object} res - The response object for sending responses.
 */
export const deleteSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.query;

    const category = await Menu.findById(categoryId);
    if (!category) {
      return res.status(404).send("No category with that id");
    }

    // Uppdatera subMenu genom att ta bort subCategory
    await Menu.updateOne(
      { _id: categoryId },
      { $pull: { subMenu: subCategoryName } }
    );

    // Hämta hela uppdaterade menyn
    const updatedMenu = await Menu.find();
    res.json(updatedMenu); // Skicka tillbaka hela menyn, inte bara kategorin
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
};

/**
 * Retrieves all categories with sub-menu items.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object for sending responses.
 */
export const getMenuCategory = (req, res) => {
  Menu.find({ subMenu: { $exists: true, $not: { $size: 0 } } })
    .then((categories) => res.json(categories))
    .catch((err) => res.sendStatus(400).json("Error: " + err));
};

/**
 * Retrieves all categories.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object for sending responses.
 */
export const getCategory = async (req, res) => {
  Menu.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.sendStatus(400).json("Error: " + err));
};
