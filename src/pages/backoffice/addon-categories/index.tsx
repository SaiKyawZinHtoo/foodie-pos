import ItemCard from "@/components/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";

const AddonCategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const addonCategories = useAppSelector((state) => state.addonCategory.item);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          mr: 3,
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Addon Categories
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addonCategories.map((item) => (
          <ItemCard
            key={item.id}
            title={item.name}
            icon={<ClassIcon />}
            href={`/backoffice/addon-categories/${item.id}`}
          />
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonCategoriesPage;
