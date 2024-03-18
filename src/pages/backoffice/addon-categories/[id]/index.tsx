import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slice/addonCategorySlice";
import { setOpenSnackbar } from "@/store/slice/snackbarSlice";
import { UpdateAddonCategoryOptions } from "@/types/addonCategory";
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
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetail = () => {
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const addonCategories = useAppSelector((state) => state.addonCategory.item);
  const menus = useAppSelector((state) => state.menu.items);
  const menuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.item
  );
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const currentMenuAddonCategories = menuAddonCategories.filter(
    (item) => item.addonCategoryId === addonCategoryId
  );
  const menuIds = currentMenuAddonCategories.map((item) => item.menuId);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UpdateAddonCategoryOptions>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addonCategory) {
      setData({ ...addonCategory, menuIds });
    }
  }, [addonCategory]);

  if (!addonCategory || !data) return null;

  const handleUpdateAddonCategory = () => {
    const isValid = data.name && data.menuIds.length > 0;
    if (!isValid) return null;
    dispatch(
      updateAddonCategory({
        ...data,
        onSuccess: () =>
          dispatch(setOpenSnackbar({ message: "Updated Menu Success.." })),
      })
    );
  };

  const handleDeleteAddonCategory = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryId,
        onSuccess: () => {
          dispatch(
            setOpenSnackbar({ message: "Delete Addon Category Successfuly..." })
          );
          router.push("/backoffice/addon-categories");
        },
      })
    );
  };

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedId = evt.target.value as number[];
    setData({ ...data, id: addonCategoryId, menuIds: selectedId });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={addonCategory.name}
        onChange={(evt) => setData({ ...data, name: evt.target.value })}
      />
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Menu</InputLabel>
        <Select
          multiple
          label="Menu"
          value={data.menuIds}
          onChange={handleOnChange}
          renderValue={(selectedMenuIds) => {
            return selectedMenuIds
              .map((selectedMenuId) => {
                return menus.find((item) => item.id === selectedMenuId) as Menu;
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
          {menus.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox
                checked={data.menuIds.includes(item.id)}
                onChange={(evt, value) =>
                  setData({ ...data, isRequired: value })
                }
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Checkbox defaultChecked={addonCategory.isRequired} />}
        //onChange={(evt, value) => setData({ ...data, isRequired: value })}
        label="Required"
      />
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={handleUpdateAddonCategory}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete Addon Category</DialogTitle>
        <DialogContent>
          Are You Sure You Want To Delete This Addon Category?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeleteAddonCategory}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddonCategoryDetail;
