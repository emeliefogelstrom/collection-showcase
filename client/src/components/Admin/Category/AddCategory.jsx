//AddCategory.js
import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../actions/menu";

/**
 * AddCategory component allows users to create a new category.
 * It manages the input for the category name and dispatches an action to add the category.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleCloseDialog - Function to close the dialog after the category is added.
 * @returns {JSX.Element} The rendered AddCategory component.
 */
function AddCategory({ handleCloseDialog }) {
  const [categoryData, setCategoryData] = useState({ categoryName: "" });
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCategoryData({
        ...categoryData,
        [name]: value,
      });
    },
    [categoryData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newCategory = {
        newCategory: categoryData.categoryName,
      };
      dispatch(addCategory(newCategory));
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, categoryData.categoryName]
  );

  return (
    <div>
      <h3>Add new category</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="categoryName"
          label="New category"
          variant="outlined"
          value={categoryData.categoryName}
          onChange={handleInputChange}
        />
        <p />
        <Button variant="contained" color="primary" type="submit">
          Add new category
        </Button>
      </form>
    </div>
  );
}

export default AddCategory;
