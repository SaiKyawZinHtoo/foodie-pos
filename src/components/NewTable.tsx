import { useAppDispatch } from "@/store/hooks";
import { createTable } from "@/store/slice/tableSlice";
import { CreateTableOptions } from "@/types/table";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultTable = {
  name: "",
  locationId: undefined,
};

const NewTable = ({ open, setOpen }: Props) => {
  const [newTable, setNewTable] = useState<CreateTableOptions>(defaultTable);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewTable({
      ...newTable,
      locationId: Number(localStorage.getItem("selectedLocationId")),
    });
  }, []);

  const handleNewTable = () => {
    dispatch(createTable({ ...newTable, onSuccess: () => setOpen(false) }));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewTable(defaultTable);
      }}
    >
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Name"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewTable({ ...newTable, name: evt.target.value })
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!newTable.name}
            onClick={handleNewTable}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
