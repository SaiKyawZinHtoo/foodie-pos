import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hooks";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState(false);
  const menuCategories = useAppSelector((state) => state.menuCategory.item);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Menu Category
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories.map((item) => (
          <ItemCard
            key={item.id}
            title={item.name}
            icon={<CategoryIcon />}
            href={`/backoffice/menu-categories/${item.id}`}
          />
        ))}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MenuCategory;
