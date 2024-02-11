import NewAddon from "@/components/NewAddon";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const AddonsPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Addons
        </Button>
      </Box>
      <h1>Addons Page</h1>
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonsPage;
