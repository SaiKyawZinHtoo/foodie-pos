import NewMenuCategory from "@/components/NewMenuCategory";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Menu Category
        </Button>
      </Box>
      <h1>MenuCategoryPage</h1>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MenuCategory;
