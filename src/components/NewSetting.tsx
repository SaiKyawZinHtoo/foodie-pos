import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewSetting = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Setting</DialogTitle>
      <DialogContent>
        <h1>New Setting Form...</h1>
      </DialogContent>
    </Dialog>
  );
};

export default NewSetting;
