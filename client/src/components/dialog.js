//dialog.js
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * ScrollDialog component renders a modal dialog with scrollable content.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {function} props.onClose - Function to call when the dialog is closed.
 * @param {string} props.title - Title displayed at the top of the dialog.
 * @param {React.ReactNode} props.children - Content to be displayed inside the dialog.
 *
 * @returns {JSX.Element} Rendered dialog component.
 */
export default function ScrollDialog({ open, onClose, title, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
