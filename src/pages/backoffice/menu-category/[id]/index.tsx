import BackofficeLayout from "@/components/backofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategorySlices";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateMenuCategory = () => {
  const [name, setName] = useState<string>("");
  const menuCategories = useAppSelector((state) => state.menuCategory.item);
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const dispatch = useAppDispatch();

  if (!menuCategoryId) return null;

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          defaultValue={menuCategory?.name}
          sx={{ width: "fit-content" }}
          onChange={(evt) => setName(evt.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={() =>
            dispatch(updateMenuCategory({ id: menuCategoryId, name }))
          }
        >
          Update
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default UpdateMenuCategory;
