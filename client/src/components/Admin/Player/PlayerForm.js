//PlayerForm.js
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DOMPurify from "dompurify";
import CategorySelect from "./CategorySelect";
import PlayerData from "./PlayerData";
import ImageUpload from "./ImageUpload";

/**
 * AddUpdatePlayerForm component allows users to add a new player or update
 * an existing player's information.
 *
 * @param {Object} props - The component props.
 * @param {Object} [props.player] - The player data to be updated; if undefined, a new player is created.
 * @param {function} props.handleSubmit - Function to handle the form submission.
 * @param {function} props.handleCloseUpdatePlayer - Function to close the form after submission.
 * @returns {JSX.Element} The rendered AddUpdatePlayerForm component.
 */
function AddUpdatePlayerForm({
  player,
  handleSubmit,
  handleCloseUpdatePlayer,
}) {
  const [playerData, setPlayerData] = useState({
    name: "",
    club: "",
    infoEnglish: "",
    infoNorwegian: "",
    category: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const category = useSelector((state) => state.menus);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoriesByCategory, setSelectedSubCategoriesByCategory] =
    useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [menuData, setMenuData] = useState({
    categories: [],
    subCategories: {},
  });

  useEffect(() => {
    const categories = category || [];
    const subCategories = {};

    categories.forEach((cat) => {
      subCategories[cat.mainMenu] = cat.subMenu
        .flatMap((sub) => {
          const match = sub.match(/(\d{4})-tal/);
          if (match) {
            const startYear = parseInt(match[1], 10);
            return Array.from({ length: 10 }, (_, i) => startYear + i); // Skapa lista av år
          }
          return sub; // Lägg till sub som det är om det inte är ett årtionde
        })
        .sort((a, b) => {
          // Sortera år först om båda är nummer
          if (typeof a === "number" && typeof b === "number") return a - b;
          // Behåll alfabetisk ordning för strängar
          return a.toString().localeCompare(b.toString());
        });
    });

    const filteredCategories = categories.filter(
      (cat) => subCategories[cat.mainMenu].length > 0
    );

    setMenuData({
      categories: filteredCategories,
      subCategories,
    });
  }, [category]);

  useEffect(() => {
    if (player) {
      setPlayerData({
        name: DOMPurify.sanitize(player.name) || "",
        club: DOMPurify.sanitize(player.club) || "",
        infoEnglish: player.infoEnglish
          ? DOMPurify.sanitize(player.infoEnglish)
          : "",
        infoNorwegian: player.infoNorwegian
          ? DOMPurify.sanitize(player.infoNorwegian)
          : "",
        category: player.category || [],
      });

      setExistingImages(player.images || []);

      const updatedSelectedSubCategories = [];
      player.category.forEach(({ main, sub }) => {
        updatedSelectedSubCategories.push({
          main,
          sub: sub || "",
        });
      });

      const updatedSelectedSubCategoriesByCategory =
        updatedSelectedSubCategories.reduce((acc, { main, sub }) => {
          if (!acc[main]) acc[main] = [];
          acc[main].push(sub);
          return acc;
        }, {});

      setSelectedSubCategoriesByCategory(
        updatedSelectedSubCategoriesByCategory
      );
      setSelectedSubCategories(
        Object.values(updatedSelectedSubCategoriesByCategory).flat()
      );
    }
  }, [player]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const sanitizedValue = DOMPurify.sanitize(value);
      setPlayerData({
        ...playerData,
        [name]: sanitizedValue,
      });
    },
    [playerData]
  );

  const handleSelectChange = useCallback(
    (e) => {
      const newSelectedCategory = e.target.value;
      setSelectedCategory(newSelectedCategory);

      const selectedSubCategoriesForNewCategory =
        selectedSubCategoriesByCategory[newSelectedCategory] || [];

      setSelectedSubCategories(selectedSubCategoriesForNewCategory);
    },
    [selectedSubCategoriesByCategory]
  );

  const handleImageChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));

      setImageFiles([...imageFiles, ...files]);
      setImagePreviews([...imagePreviews, ...previews]);
      setPlayerData({ ...playerData, images: [...imageFiles, ...files] });
    },
    [imageFiles, imagePreviews, playerData]
  );

  const handleRemoveImage = useCallback(
    (index) => {
      if (index < existingImages.length) {
        const updatedExistingImages = [...existingImages];
        updatedExistingImages.splice(index, 1);
        setExistingImages(updatedExistingImages);
      } else {
        const updatedFiles = [...imageFiles];
        const updatedPreviews = [...imagePreviews];

        const newIndex = index - existingImages.length;

        updatedFiles.splice(newIndex, 1);
        updatedPreviews.splice(newIndex, 1);

        setImageFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
      }

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    },
    [existingImages, imageFiles, imagePreviews]
  );

  const handleSubCategoryChange = useCallback(
    (e) => {
      const { value } = e.target;
      const newSubCategories = value;

      if (typeof selectedCategory === "string") {
        setSelectedSubCategoriesByCategory((prev) => ({
          ...prev,
          [selectedCategory]: newSubCategories,
        }));
      }

      setSelectedSubCategories(newSubCategories);
    },
    [selectedCategory]
  );

  const mergeCategories = useCallback((existingCategories, newCategories) => {
    const existingSet = new Set(
      existingCategories.map((cat) => JSON.stringify(cat))
    );

    newCategories.forEach((cat) => existingSet.add(JSON.stringify(cat)));

    return Array.from(existingSet).map((cat) => JSON.parse(cat));
  }, []);

  /**
   * clear resets the player data to its initial state.
   *
   * This function clears all fields in the player data form by setting
   * the playerData state to empty strings for the name and club properties.
   */
  const clear = () => {
    setPlayerData({
      name: "",
      club: "",
      infoEnglish: "",
      infoNorwegian: "",
      category: "",
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const flattenedCategories = Object.entries(
        selectedSubCategoriesByCategory
      ).flatMap(([main, subCategories]) =>
        subCategories.map((sub) => ({ main, sub }))
      );

      const mergedCategories = mergeCategories(
        playerData.category,
        flattenedCategories
      );

      const updatedPlayerData = {
        ...playerData,
        category: mergedCategories,
        images: existingImages.concat(imageFiles),
      };

      handleSubmit(updatedPlayerData);
      handleCloseUpdatePlayer(false);
      clear();
    },
    [
      existingImages,
      handleCloseUpdatePlayer,
      handleSubmit,
      imageFiles,
      mergeCategories,
      playerData,
      selectedSubCategoriesByCategory,
    ]
  );

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PlayerData
            playerData={playerData}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategorySelect
            selectedCategory={selectedCategory}
            showExistingCategories={Boolean(player)}
            handleSelectChange={handleSelectChange}
            menuData={menuData}
            handleSubCategoryChange={handleSubCategoryChange}
            selectedSubCategoryValues={selectedSubCategories.map(String)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageUpload
            imagePreviews={imagePreviews}
            showExistingImages={player ? true : false}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            existingImages={existingImages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" type="submit">
            {player ? "Update Player" : "Add Player"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddUpdatePlayerForm;
