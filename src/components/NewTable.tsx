import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTable = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <h1>New Table Form...</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
