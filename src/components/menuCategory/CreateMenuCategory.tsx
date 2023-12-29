import config from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory, setMenuCategories } from "@/store/slices/menuCategorySlices";
import { CreateMenuCategoryPayload } from "@/types/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultNewMenuCategory = {
  name: "",
  isAvailable: true,
};
const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newMenuCategory, setNewMenuCategory] =
    useState<CreateMenuCategoryPayload>(defaultNewMenuCategory);
  const handleCrateMenuCategory = async () => {
    

    dispatch(createMenuCategory(newMenuCategory));
    setNewMenuCategory(defaultNewMenuCategory);
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

  const hanldeNewUpdate = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMenuCategory({
      isAvailable: newMenuCategory.isAvailable,
      name: evt.target.value,
    });
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Category</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            defaultValue={newMenuCategory.name}
            sx={{ width: 350, mb: 3 }}
            placeholder="Name"
            onChange={hanldeNewUpdate}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newMenuCategory.isAvailable}
                onChange={(evt, value) =>
                  setNewMenuCategory({
                    name: newMenuCategory.name,
                    isAvailable: !newMenuCategory.isAvailable,
                  })
                }
              />
            }
            label="Available"
            sx={{ mb: 2 }}
          />
          {/* <TextField
            sx={{ width: 350, mb: 3 }}
            placeholder="Price"
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: Number(evt.target.value) })
            }
          /> */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleCrateMenuCategory}
            >
              Create
            </Button>
          </Box>
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

export default CreateMenuCategory;
