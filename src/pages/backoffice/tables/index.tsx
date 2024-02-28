import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const TablePages = () => {
  const [open, setOpen] = useState(false);
  const tables = useAppSelector((state) => state.table.item);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Table
        </Button>
      </Box>
      <Box>
        {tables.map((item) => (
          <Typography key={item.id}>{item.name}</Typography>
        ))}
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TablePages;
