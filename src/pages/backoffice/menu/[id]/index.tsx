import BackofficeLayout from "@/components/backofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

const UpdateMenu = () => {
  const menus = useAppSelector((state) => state.menu.item);
  const router = useRouter();
  const menuId = Number(router.query.id);
  const menu = menus.find((item) => item.id === menuId);

  return (
    <BackofficeLayout>
      <Box sx={{display: "flex", flexDirection: "column"}}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        defaultValue={menu?.name}
        sx={{width: "fit-content"}}
      />
      <Button variant="contained" sx={{width: "fit-content", mt: 2}}>
        Update
      </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default UpdateMenu;
