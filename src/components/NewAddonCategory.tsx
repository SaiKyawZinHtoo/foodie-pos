import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAddonCategory = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Addon Category</DialogTitle>
      <DialogContent>
        <h1>New Addon Category Form...</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
