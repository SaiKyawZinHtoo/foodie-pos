import BackofficeLayout from "@/components/backofficeLayout";

import ItemCard from "@/components/Item/itemCard";
import CreateMenuCategory from "@/components/menuCategory/CreateMenuCategory";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MenuCategory } from "@/types/menuCategory";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategoryPage = () => {
  const menuCategories = useAppSelector((store) => store.menuCategory.item)
  const [open, setOpen] = useState<boolean>(false);
  return (
    <BackofficeLayout>
      <Box>
        {/* <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          sx={{ width: 350, mb: 3 }}
          placeholder="Name"
          onChange={(evt) => setMenu({ ...Menu, name: evt.target.value })}
        />
        <TextField
          sx={{ width: 350, mb: 3 }}
          placeholder="Price"
          onChange={(evt) =>
            setMenu({ ...Menu, price: Number(evt.target.value) })
          }
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={CrateMenu}
        >
          Create Menu
        </Button>
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={DeleteMenu}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={updateMenu}
        >
          Update Menu
        </Button>
      </Box> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create Menu Category
          </Button>
        </Box>
        <CreateMenuCategory
          open={open}
          setOpen={setOpen}
          
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3.5 }}>
          {menuCategories.map((menuCategory) => (
            <ItemCard
              href={`/backoffice/menu-category/${menuCategory.id}`}
              icon={<CategoryIcon />}
              key={menuCategory.id}
              title={menuCategory.name}
              
            />
          ))}
        </Box>
      </Box>
    </BackofficeLayout>
  );
};

export default MenuCategoryPage;
