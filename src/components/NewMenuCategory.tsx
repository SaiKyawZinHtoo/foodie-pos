import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory } from "@/store/slice/menuCategorySlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
  };

  const handleCreateMenuCategory = () => {
    const selectedLocationId = localStorage.getItem("selectedLocationId");
    dispatch(
      createMenuCategory({
        name,
        locationId: Number(selectedLocationId),
        onSuccess,
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Menu Category</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="Name"
            variant="outlined"
            autoFocus
            sx={{ width: "100%" }}
            onChange={(evt) => setName(evt.target.value)}
          />
        </Box>
        <DialogActions sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!name}
            onClick={handleCreateMenuCategory}
          >
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenuCategory;
