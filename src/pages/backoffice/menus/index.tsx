import NewMenu from "@/components/NewMenu";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const Menus = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Menu
        </Button>
      </Box>
      <h1>Menus Page</h1>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Menus;
