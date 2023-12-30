import BackofficeLayout from "@/components/backofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/slices/menuSlice";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateMenu = () => {
  const [name, setName] = useState<string>('');
  const menus = useAppSelector((state) => state.menu.item);
  const router = useRouter();
  const menuId = Number(router.query.id);
  const menu = menus.find((item) => item.id === menuId);
  const dispatch = useAppDispatch();

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          defaultValue={menu?.name}
          sx={{ width: "fit-content" }}
          onChange={(evt) => setName(evt.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={() => dispatch(updateMenu({ id: menuId, name }))}
        >
          Update
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default UpdateMenu;
