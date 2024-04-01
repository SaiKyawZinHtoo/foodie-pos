import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTable, updateTable } from "@/store/slice/tableSlice";
import { UpdateTableOptions } from "@/types/table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const tables = useAppSelector((state) => state.table.item);
  const table = tables.find((item) => item.id === tableId);
  const [data, setData] = useState<UpdateTableOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (table) {
      setData({
        id: table.id,
        name: table.name,
        locationId: table.locationId,
      });
    }
  }, [table]);

  if (!table || !data) return null;

  const handleUpdateTable = () => {
    dispatch(updateTable(data));
  };

  const handleDeleteTable = () => {
    dispatch(
      deleteTable({
        id: table.id,
        onSuccess: () => router.push("/backoffice/tables"),
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={data.name}
        onChange={(evt) =>
          setData({ ...data, id: table.id, name: evt.target.value })
        }
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={handleUpdateTable}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete Table</DialogTitle>
        <DialogContent>
          Are You Sure You Want To Delete This Table?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteTable}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableDetail;
