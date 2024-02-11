import NewAddonCategory from "@/components/NewAddonCategory";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const AddonCategoriesPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Addon Categories
        </Button>
      </Box>
      <h1>Addon Categories Page</h1>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonCategoriesPage;
