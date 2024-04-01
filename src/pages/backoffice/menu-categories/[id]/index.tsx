import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenuCategory, updateMenuCategory } from "@/store/slice/menuCategorySlice";
import { deleteMenu } from "@/store/slice/menuSlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const menuCategories = useAppSelector((state) => state.menuCategory.item);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const [data, setData] = useState<UpdateMenuCategoryOptions>();
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menuCategory) {
      setData({ ...menuCategory });
    }
  }, [menuCategory]);

  if (!menuCategory || !data) return null;

  const handleUpdateMenuCategory = () => {
    dispatch(updateMenuCategory(data));
  };

  const handleDeleteMenuCategory = () => {
    dispatch(
      deleteMenuCategory({
        id: menuCategoryId,
        onSuccess: () => router.push("/backoffice/menu-categories"),
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={menuCategory.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: menuCategoryId, name: evt.target.value })
        }
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleUpdateMenuCategory}>
          Update
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete Menu Category</DialogTitle>
        <DialogContent>
          Are You Sure You Want To Delete This Menu Category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteMenuCategory}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuCategoryDetail;
