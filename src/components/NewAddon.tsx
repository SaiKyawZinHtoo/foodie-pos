import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slice/addonSlice";
import { CreateAddonOptions } from "@/types/addon";
import {
  Box,
  Button,
  Dialog,
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
import { AddonCategory } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultNewAddon = {
  name: "",
  price: 0,
  addonCategoryId: undefined,
};

const NewAddon = ({ open, setOpen }: Props) => {
  const [newAddon, setNewAddon] = useState<CreateAddonOptions>(defaultNewAddon);
  const dispatch = useAppDispatch();
  const addonCategories = useAppSelector((state) => state.addonCategory.item);

  const handleOnChange = (evt: SelectChangeEvent<number>) => {
    const selectedId = evt.target.value as number;
    setNewAddon({ ...newAddon, addonCategoryId: selectedId });
  };

  const handleCreateAddon = () => {
    dispatch(createAddon({ ...newAddon, onSuccess: () => setOpen(false) }));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setNewAddon(defaultNewAddon);
      }}
    >
      <DialogTitle>Crate New Addon</DialogTitle>
      <DialogContent>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="Name"
              sx={{ mb: 2 }}
              onChange={(evt) =>
                setNewAddon({ ...newAddon, name: evt.target.value })
              }
            />
            <TextField
              placeholder="Price"
              onChange={(evt) =>
                setNewAddon({ ...newAddon, price: Number(evt.target.value) })
              }
            />
          </Box>
          <FormControl fullWidth sx={{ mt: 2, width: 400 }}>
            <InputLabel>Addon Category</InputLabel>
            <Select
              label="Addon Category"
              onChange={handleOnChange}
              value={newAddon.addonCategoryId}
              renderValue={(selectedAddonCategoryId) => {
                return (
                  addonCategories.find(
                    (item) => item.id === selectedAddonCategoryId
                  ) as AddonCategory
                ).name; // အဲ့အပိုင်းကိုကျွန်တော်လုပ်ထားတဲ့အပိုင်းကတော့ ချက်ကြီးကိုမေးထားပြီးတော့လုပ်ထားတဲ့အပိုင်းဖြစ်တယ် တကယ်တန်းဖြစ်တာကတော့ name ကိုဖတ်လို့ကိုမရဘူးဖြစ်နေလို့အဲ့တာကြောင့်မလို့ကို ? ကိုထည့်ပေးလိုက်တာ တကယ်တန်းကတော့ error ကတော့ ‌ရှိနေတုန်းပဲ
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
              {addonCategories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              disabled={!newAddon.name || !newAddon.addonCategoryId}
              onClick={handleCreateAddon}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddon;
