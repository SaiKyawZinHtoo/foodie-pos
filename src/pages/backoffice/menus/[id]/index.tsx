import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAddonCategory } from "@/store/slice/addonCategorySlice";
import { removeMenuAddonCategoryById } from "@/store/slice/menuAddonCategorySlice";
import { deleteMenu, updateMenu } from "@/store/slice/menuSlice";
import { UpdateMenuOptions } from "@/types/menu";
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
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateMenuPage = () => {
  const router = useRouter();
  const menuId = Number(router.query.id);
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategories = useAppSelector((state) => state.menuCategory.item);
  const menuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.item
  );
  const menu = menus.find((item) => item.id === menuId);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.item
  );
  const currentMenuCategoryMenu = menuCategoryMenus.filter(
    (item) => item.menuId === menuId
  );
  const menuCategoryIds = currentMenuCategoryMenu.map(
    (item) => item.menuCategoryId
  );

  const [data, setData] = useState<UpdateMenuOptions>();
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (menu) {
      setData({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        menuCategoryIds,
      });
    }
  }, [menu]);

  if (!menu || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setData({ ...data, id: menuId, menuCategoryIds: selectedIds });
  };

  const handleUpdateMenu = () => {
    dispatch(updateMenu(data));
  };

  const handleDeleteMenu = () => {
    dispatch(
      deleteMenu({
        id: menuId,
        onSuccess: () => {
          const addonCategoryIds = menuAddonCategories
            .filter((item) => item.menuId === menuId)
            .map((item) => item.addonCategoryId);
          addonCategoryIds.forEach((addonCategoryId) => {
            const entries = menuAddonCategories.filter(
              (item) => item.addonCategoryId === addonCategoryId
            );
            if (entries.length === 1) {
              const menuAddonCategoryId = entries[0].id;
              dispatch(removeAddonCategory({ id: addonCategoryId }));
              dispatch(
                removeMenuAddonCategoryById({ id: menuAddonCategoryId })
              );
            }
          });
        },
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
        defaultValue={menu.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: menuId, name: evt.target.value })
        }
      />
      <TextField
        defaultValue={menu.price}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setData({ ...data, id: menuId, price: Number(evt.target.value) })
        }
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Menu Category</InputLabel>
        <Select
          multiple
          value={data.menuCategoryIds}
          label="Menu Category"
          onChange={handleOnChange}
          renderValue={(selectedMenuCategoryIds) => {
            return selectedMenuCategoryIds
              .map((selectedMenuCategoryId) => {
                return menuCategories.find(
                  (item) => item.id === selectedMenuCategoryId
                ) as MenuCategory;
              })
              .map((item) => (
                <Chip key={item.id} label={item.name} sx={{ mr: 2 }} />
              ));
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {menuCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={data.menuCategoryIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleUpdateMenu}>
          Update
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete Menu</DialogTitle>
        <DialogContent>
          Are You Sure You Want To Delete This Menu?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteMenu}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateMenuPage;
