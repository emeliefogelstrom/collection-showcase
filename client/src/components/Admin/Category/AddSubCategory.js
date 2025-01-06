//AddSubCategory.js
import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addSubCategory } from "../../../actions/menu";

/**
 * AddSubCategory component provides a form to add a new subcategory
 * under a specified main category.
 *
 * @param {Object} props - The component props.
 * @param {string} props.mainCategory - The main category under which the subcategory will be added.
 * @param {function} props.handleCloseDialog - Function to close the dialog after adding the subcategory.
 * @returns {JSX.Element} The rendered AddSubCategory component.
 */
function AddSubCategory({ mainCategory, handleCloseDialog }) {
  const [subCategory, setSubCategory] = useState("");
  const dispatch = useDispatch();

  const handleSubCategoryChange = useCallback((e) => {
    setSubCategory(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newSubCategory = {
        category: mainCategory,
        newSubCategory: subCategory,
      };

      dispatch(addSubCategory(newSubCategory));

      setSubCategory("");
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, mainCategory, subCategory]
  );

  return (
    <div>
      <h3>Add new subcategory</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="categoryName"
          label="New subcategory"
          variant="outlined"
          value={subCategory}
          onChange={handleSubCategoryChange}
        />
        <p />
        <Button variant="contained" color="primary" type="submit">
          Add new subcategory
        </Button>
      </form>
    </div>
  );
}

export default AddSubCategory;
