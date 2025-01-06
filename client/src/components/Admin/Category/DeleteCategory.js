//DeleteCategory.js
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { deleteCategory } from "../../../actions/menu";

/**
 * DeleteCategory component allows users to delete a specified category.
 * It provides a confirmation dialog before executing the deletion.
 *
 * @param {Object} props - The component props.
 * @param {string} props.category - The category to be deleted.
 * @param {string} props.id - The unique identifier of the category to be deleted.
 * @param {function} props.handleCloseDialog - Function to close the dialog after deletion or cancellation.
 * @returns {JSX.Element} The rendered DeleteCategory component.
 */
function DeleteCategory({ category, id, handleCloseDialog }) {
  const dispatch = useDispatch();

  const handleDeleteCategory = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(deleteCategory(id));
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, id]
  );

  return (
    <div>
      <h3>Delete category</h3>
      <p>
        Are you sure you want to delete the category &quot;{category}&quot;?
      </p>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteCategory}
      >
        Yes, delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleCloseDialog}>
        Cancel
      </Button>
    </div>
  );
}

export default DeleteCategory;
