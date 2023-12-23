import { Menu } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CreateMenu from "./CreateMenu";
import ImageCard from "@/components/ImageCard/ImageCard";
import BackofficeLayout from "@/components/backofficeLayout";
import config from "@/config";


const MenuPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  console.log("Current Menus: ", menus);

  useEffect(()=>{
    //fetchMenus()
  },[])

  const fetchMenus = async () => {
    const response = await fetch(`${config.apiBaseUrl}/Menu`);
    const menus = await response.json();
    setMenus(menus);
  };

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
          Create Menu
        </Button>
      </Box>
      <CreateMenu open={open} setOpen={setOpen} setMenus={setMenus} />
      <Box sx={{display: "flex", flexWrap: "wrap", mt: 3.5}}>
        {menus.map((menu) => (
          <ImageCard key= {menu.id} menu={menu} />
        ))}
      </Box>
    </Box>
    </BackofficeLayout>
  );
};

export default MenuPage;

