import config from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { setMenus } from "@/store/slices/menuSlice";
import { CreateMenuPayload, Menu } from "@/types/menu";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";


interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  
}

const defaultMenu = {
  name: "",
  price: 0,
  assetUrl: "",
}
const CreateMenu = ({ open, setOpen}: Props) => {
  const [newMenu, setNewMenu] = useState<CreateMenuPayload>(defaultMenu);
  const dispatch = useAppDispatch()
  const CrateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menu`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    const menus = await response.json();
    console.log("Data From Server: ", menus);
    dispatch(setMenus(menus))
    setNewMenu(defaultMenu)
    setOpen(false);
  };

  const DeleteMenu = async () => {
    const menuIdToDelete = 1;
    const response = await fetch(
      `http://localhost:4000/Menu/${menuIdToDelete}`,
      {
        method: "DELETE",
      }
    );
    const dataFromServer = await response.json();
    console.log("Data From Server: ", dataFromServer);
  };

  const updateMenu = async () => {
    const menuToUpdate = { id: 2, name: "မုန့်ဟင်းခါး", price: 2000 };
    const response = await fetch("http://localhost:4000/Menu", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menuToUpdate),
    });
    const dataFromServer = await response.json();
    console.log("Data From Server: ", dataFromServer);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: 350, mb: 3 }}
            placeholder="Name"
            onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
          />
          <TextField
            sx={{ width: 350, mb: 3 }}
            placeholder="Price"
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: Number(evt.target.value) })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={CrateMenu}
          >
            Create 
          </Button>
          {/* <Button
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
          </Button> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMenu;
