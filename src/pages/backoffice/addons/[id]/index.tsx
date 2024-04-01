import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slice/addonSlice";
import { UpdateAddonOptions } from "@/types/addon";
import {
  Box,
  Button,
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
import { AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetail = () => {
  const router = useRouter();
  const addonId = Number(router.query.id);
  const addons = useAppSelector((state) => state.addon.item);
  const addonCategories = useAppSelector((state) => state.addonCategory.item);
  const addon = addons.find((item) => item.id === addonId);
  const [data, setData] = useState<UpdateAddonOptions>();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (addon) {
      setData({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addonCategoryId,
      });
    }
  }, [addon]);

  if (!addon || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<number>) => {
    const selectedIds = evt.target.value as number;
    setData({ ...data, id: addon.id, addonCategoryId: selectedIds });
  };

  const handleUpdateAddon = () => {
    dispatch(updateAddon(data));
  };

  const handleDeleteAddon = () => {
    dispatch(
      deleteAddon({
        id: addon.id,
        onSuccess: () => router.push("/backoffice/addons"),
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", m: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={data.name}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, name: evt.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        defaultValue={data.price}
        onChange={(evt) =>
          setData({ ...data, id: addon.id, price: Number(evt.target.value) })
        }
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Addon Category</InputLabel>
        <Select
          label="Addon Category"
          value={data.addonCategoryId}
          onChange={handleOnChange}
          renderValue={(selectedAddonCategoryId) => {
            return (
              addonCategories.find(
                (item) => item.id === selectedAddonCategoryId
              ) as AddonCategory
            )?.name; // အဲ့အပိုင်းကိုကျွန်တော်လုပ်ထားတဲ့အပိုင်းကတော့ ချက်ကြီးကိုမေးထားပြီးတော့လုပ်ထားတဲ့အပိုင်းဖြစ်တယ် တကယ်တန်းဖြစ်တာကတော့ name ကိုဖတ်လို့ကိုမရဘူးဖြစ်နေလို့အဲ့တာကြောင့်မလို့ကို ? ကိုထည့်ပေးလိုက်တာ တကယ်တန်းကတော့ error ကတော့ ‌ရှိနေတုန်းပဲ
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
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={handleUpdateAddon}
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
          <Button variant="contained" onClick={handleDeleteAddon}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddonDetail;
