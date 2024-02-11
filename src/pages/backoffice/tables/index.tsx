import NewTable from "@/components/NewTable";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const TablePages = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Table
        </Button>
      </Box>
      <h1>Table Pages</h1>
      <NewTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TablePages;
