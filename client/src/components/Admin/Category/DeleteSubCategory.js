//DeleteSubCategory.js
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { deleteSubCategory } from "../../../actions/menu";

/**
 * DeleteSubCategory component allows users to delete a specified subcategory.
 * It provides a confirmation dialog before executing the deletion.
 *
 * @param {Object} props - The component props.
 * @param {string} props.mainCategory - The main category that the subcategory belongs to.
 * @param {string} props.subCategory - The subcategory to be deleted.
 * @param {function} props.handleCloseDialog - Function to close the dialog after deletion or cancellation.
 * @returns {JSX.Element} The rendered DeleteSubCategory component.
 */
function DeleteSubCategory({ mainCategory, subCategory, handleCloseDialog }) {
  const dispatch = useDispatch();

  const handleDeleteCategory = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(deleteSubCategory(mainCategory, subCategory));
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, mainCategory, subCategory]
  );

  return (
    <div>
      <h3>Delete sub category</h3>
      <p>
        Are you sure you want to delete the sub category &quot;{subCategory}
        &quot;?
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

export default DeleteSubCategory;
