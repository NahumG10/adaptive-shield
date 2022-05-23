import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function AlbumModal({
  isModalShown,
  setIsModalShown,
  albums,
  currPhoto,
}) {
  return (
    <Dialog
      open={isModalShown}
      onClose={() => {
        setIsModalShown(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{currPhoto?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <img width={200} height={200} src={currPhoto?.url} alt="" />
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <span>Album: {albums[currPhoto?.albumId - 1]?.title}</span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <span>Id: {currPhoto?.id}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setIsModalShown(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
