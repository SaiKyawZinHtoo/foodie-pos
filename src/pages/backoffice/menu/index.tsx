import ImageCard from "@/components/ImageCard/ImageCard";
import BackofficeLayout from "@/components/backofficeLayout";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import CreateMenu from "../../../components/createMenu/CreateMenu";

const MenuPage = () => {
  const menus = useAppSelector((store) => store.menu.item )
  //const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    //fetchMenus()
  }, []);

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
        <CreateMenu open={open} setOpen={setOpen} />
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3.5 }}>
          {menus.map((menu) => (
            <ImageCard key={menu.id} menu={menu} />
          ))}
        </Box>
      </Box>
    </BackofficeLayout>
  );
};

export default MenuPage;
