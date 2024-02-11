import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NewAddon = ({open, setOpen} : Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crate New Addon</DialogTitle>
        <DialogContent>
            <h1>New Addon</h1>
        </DialogContent>
    </Dialog>
  )
};

export default NewAddon;
