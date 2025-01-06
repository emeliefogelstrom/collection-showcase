//ImageUpload.js
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * ImageUpload component allows users to upload and preview images,
 * as well as remove selected images.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.imagePreviews - Array of image previews to display.
 * @param {function} props.handleImageChange - Function to handle changes to the image input.
 * @param {function} props.handleRemoveImage - Function to remove a selected image.
 * @returns {JSX.Element} The rendered ImageUpload component.
 */
function ImageUpload({
  imagePreviews,
  handleImageChange,
  handleRemoveImage,
  existingImages,
}) {
  return (
    <div>
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      {existingImages?.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Existing ${index + 1}`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <IconButton onClick={handleRemoveImage}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      {imagePreviews?.map((preview, index) => (
        <div key={index}>
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <IconButton onClick={handleRemoveImage}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default ImageUpload;
