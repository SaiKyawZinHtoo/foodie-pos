import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slice/addonCategorySlice";
import { CreateAddonCategoryOptions } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
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
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultNewAddonCategory = {
  name: "",
  isRequired: true,
  menuIds: [],
};

const NewAddonCategory = ({ open, setOpen }: Props) => {
  const [newAddonCategory, setNewAddonCategory] =
    useState<CreateAddonCategoryOptions>(defaultNewAddonCategory);

  const menus = useAppSelector((state) => state.menu.items);
  const dispatch = useAppDispatch();

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedId = evt.target.value as number[];
    setNewAddonCategory({ ...newAddonCategory, menuIds: selectedId });
  };

  const handleCreateAddonCategory = () => {
    const isValid =
      newAddonCategory.name && newAddonCategory.menuIds.length > 0;
    if (!isValid) return null;
    dispatch(
      createAddonCategory({
        ...newAddonCategory,
        onSuccess: () => setOpen(false),
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Addon Category</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ my: 2, width: "100%" }}
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel>Menus</InputLabel>
          <Select
            multiple
            label="Menus"
            value={newAddonCategory.menuIds}
            onChange={handleOnChange}
            renderValue={(selectedMenuIds) => {
              return selectedMenuIds
                .map((seletedMenuId) => {
                  return menus.find(
                    (item) => item.id === seletedMenuId
                  ) as Menu;
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
                  checked={newAddonCategory.menuIds.includes(item.id)}
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={newAddonCategory.isRequired}
              onChange={(evt, value) =>
                setNewAddonCategory({ ...newAddonCategory, isRequired: value })
              }
            />
          }
          label="Required"
          sx={{ mt: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              !newAddonCategory.name || !newAddonCategory.menuIds.length
            }
            onClick={handleCreateAddonCategory}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
