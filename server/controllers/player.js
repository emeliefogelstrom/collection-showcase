// controllers/player.js
import mongoose from "mongoose";
import Player from "../models/Player.js";
import Jimp from "jimp";
import { uploadToS3, deleteFromS3 } from "../services/imageService.js";

/**
 * Retrieves all players from the database.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object for sending responses.
 */
export const getPlayer = async (req, res) => {
  try {
    const players = await Player.find();
    return res.status(200).json(players);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieves players filtered by category from the database.
 *
 * @param {object} req - The request object containing the category key in the query.
 * @param {object} res - The response object for sending responses.
 */
export const getPlayers = async (req, res) => {
  const { key, page } = req.query;

  // Dela upp kategorierna från "key"
  const [mainCategory, rawDecadeStart] = key.split(",");
  const match = rawDecadeStart.match(/\b\d{4}\b/);
  const decadeStart = match ? parseInt(match[0], 10) : null;
  const pageNumber = parseInt(page, 10) || 1;
  const LIMIT = 9; // Antal spelare per sida
  const startIndex = (pageNumber - 1) * LIMIT;

  try {
    const decadeEnd = parseInt(decadeStart, 10) + 9;

    // Filtrera och paginera spelare
    const filteredPlayers = await Player.aggregate([
      {
        $match: {
          category: {
            $elemMatch: {
              main: mainCategory,
              sub: { $gte: `${decadeStart}`, $lte: `${decadeEnd}` },
            },
          },
        },
      },
      { $sort: { "category.sub": 1, name: 1 } }, // Sortera efter år och namn
      { $skip: startIndex }, // Hoppa över spelare för tidigare sidor
      { $limit: LIMIT }, // Begränsa till antal per sida
    ]);

    const totalMatchingPlayers = await Player.countDocuments({
      category: {
        $elemMatch: {
          main: mainCategory,
          sub: { $gte: `${decadeStart}`, $lte: `${decadeEnd}` },
        },
      },
    });

    return res.json({
      data: filteredPlayers,
      currentPage: pageNumber,
      numberOfPages: Math.ceil(totalMatchingPlayers / LIMIT),
      totalPlayers: totalMatchingPlayers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a player by their ID.
 *
 * @param {object} req - The request object containing the player ID in the params.
 * @param {object} res - The response object for sending responses.
 */
export const getPlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json(player);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Searches for players based on a query string.
 *
 * @param {object} req - The request object containing the search query and page number in the query.
 * @param {object} res - The response object for sending responses.
 */
export const getPlayersBySearch = async (req, res) => {
  const { searchQuery, page } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ message: "No search query provided" });
  }

  try {
    const LIMIT = 9;
    const pageNumber = Number(page);
    if (isNaN(pageNumber)) {
      return res.status(400).json({ message: "Invalid page number" });
    }
    const startIndex = (pageNumber - 1) * LIMIT;

    const players = await Player.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { club: { $regex: searchQuery, $options: "i" } },
            { "category.main": { $regex: searchQuery, $options: "i" } },
            { "category.sub": { $regex: searchQuery, $options: "i" } },
            { infoEnglish: { $regex: searchQuery, $options: "i" } },
            { infoNorwegian: { $regex: searchQuery, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          "category.main": 1,
          name: 1,
          club: 1,
          infoEnglish: 1,
          infoNorwegian: 1,
        },
      },
      { $sort: { "category.sub": 1, name: 1 } },
      { $skip: startIndex },
      { $limit: LIMIT },
    ]);

    const totalMatchingPlayers = await Player.countDocuments({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { club: { $regex: searchQuery, $options: "i" } },
        { "category.main": { $regex: searchQuery, $options: "i" } },
        { "category.sub": { $regex: searchQuery, $options: "i" } },
        { infoEnglish: { $regex: searchQuery, $options: "i" } },
        { infoNorwegian: { $regex: searchQuery, $options: "i" } },
      ],
    });

    return res.json({
      data: players,
      currentPage: pageNumber,
      numberOfPages: Math.ceil(totalMatchingPlayers / LIMIT),
      totalPlayers: totalMatchingPlayers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Adds a new player to the database.
 *
 * @param {object} req - The request object containing player data in the body.
 * @param {object} res - The response object for sending responses.
 */
export const addPlayer = async (req, res) => {
  const { name, club, infoEnglish, infoNorwegian, categories } = req.body;

  let categoriesToSplit = JSON.parse(categories);
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const compressedImages = await Promise.all(
      req.files.map(async (file) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
          throw new Error(`Invalid file type: ${file.mimetype}`);
        }
        const image = await Jimp.read(file.buffer);
        await image.resize(800, Jimp.AUTO).quality(80);
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

        try {
          const result = await uploadToS3({
            buffer,
            originalname: file.originalname,
            mimetype: Jimp.MIME_JPEG,
          });
          return result.Location;
        } catch (error) {
          console.error("Error uploading to S3:", error);
          throw new Error("File upload failed");
        }
      })
    );
    let categoriesWithSubs = [];

    if (Array.isArray(categoriesToSplit)) {
      categoriesToSplit.forEach((category) => {
        categoriesWithSubs.push({
          main: category.main,
          sub: category.sub,
        });
      });
    } else {
      categoriesWithSubs.push({
        main: categoriesToSplit.main,
        sub: categoriesToSplit.sub,
      });
    }

    const newPlayer = new Player({
      name,
      category: categoriesWithSubs,
      club,
      infoEnglish,
      infoNorwegian,
      images: compressedImages,
    });

    await newPlayer.save();
    res.json(newPlayer);
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
};

/**
 * Deletes a player by their ID.
 *
 * @param {object} req - The request object containing the player ID in the params.
 * @param {object} res - The response object for sending responses.
 */
export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No player with id: ${id}`);

  try {
    const player = await Player.findById(id);
    if (!player) return res.status(404).send(`No player with id: ${id}`);

    await Promise.all(
      player.images.map(async (imageUrl) => {
        const key = imageUrl.split("/").pop();
        await deleteFromS3(key);
      })
    );

    await Player.findByIdAndRemove(id);
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Updates an existing player in the database.
 *
 * @param {object} req - The request object containing the player ID in the params and updated player data in the body.
 * @param {object} res - The response object for sending responses.
 */
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    club,
    infoEnglish,
    infoNorwegian,
    categories = "[]",
    existingImages = [],
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No player with id: ${id}`);
  }

  try {
    const existingPlayer = await Player.findById(id);
    if (!existingPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    const playerImages = Array.isArray(existingPlayer.images)
      ? existingPlayer.images
      : [];

    const imagesToDelete = playerImages.filter((image) =>
      existingImages.includes(image)
    );

    for (const image of imagesToDelete) {
      await deleteFromS3(image);
    }

    const compressedImages = req.files
      ? await Promise.all(
        req.files.map(async (file) => {
          const image = await Jimp.read(file.buffer);
          await image.resize(800, Jimp.AUTO).quality(80);
          const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

          const { Location } = await uploadToS3({
            buffer,
            originalname: file.originalname,
            mimetype: Jimp.MIME_JPEG,
          });
          return Location;
        })
      )
      : [];

    let categoriesToSplit = JSON.parse(categories);
    let categoriesWithSubs = [];

    if (Array.isArray(categoriesToSplit)) {
      categoriesToSplit.forEach((category) => {
        categoriesWithSubs.push({
          main: category.main,
          sub: category.sub,
        });
      });
    } else {
      categoriesWithSubs.push({
        main: categoriesToSplit.main,
        sub: categoriesToSplit.sub,
      });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      {
        name,
        category: categoriesWithSubs,
        club,
        infoEnglish,
        infoNorwegian,
        images: [...compressedImages, ...playerImages],
      },
      { new: true }
    );

    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
