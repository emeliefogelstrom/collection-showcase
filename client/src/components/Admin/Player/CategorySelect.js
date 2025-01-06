//CategorySelect.js
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 * Component for selecting a category and subcategories from a dropdown.
 *
 * @component
 * @param {object} props - The properties for the CategorySelect component.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {function} props.handleSelectChange - Function to handle changes in the category dropdown.
 * @param {object} props.menuData - Data containing categories and subcategories for selection.
 * @param {array} props.selectedSubCategoryValues - The selected values for subcategories.
 * @param {function} props.handleSubCategoryChange - Function to handle changes in the subcategory dropdown.
 * @returns {JSX.Element} The rendered category and subcategory select elements.
 */
function CategorySelect({
  selectedCategory,
  handleSelectChange,
  menuData,
  selectedSubCategoryValues,
  handleSubCategoryChange,
}) {
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={selectedCategory}
          onChange={handleSelectChange}
          label="Category"
        >
          {menuData.categories.map((category, index) => (
            <MenuItem key={index} value={category.mainMenu}>
              {category.mainMenu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory && (
        <FormControl variant="outlined">
          <InputLabel id="subCategory">Sub Category</InputLabel>
          <Select
            labelId="subCategory"
            id="subCategory"
            multiple
            value={selectedSubCategoryValues}
            onChange={handleSubCategoryChange}
            label="Sub Category"
          >
            {menuData.subCategories[selectedCategory]?.map(
              (subCategory, index) => (
                <MenuItem key={index} value={subCategory}>
                  {subCategory}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default CategorySelect;
