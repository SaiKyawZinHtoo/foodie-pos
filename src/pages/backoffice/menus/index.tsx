import ItemCard from "@/components/ItemCard";
import NewMenu from "@/components/NewMenu";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const menus = useAppSelector((state) => state.menu.items);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Menu
        </Button>
      </Box>
      <Box>
        {menus.map((item) => (
          <ItemCard
            key={item.id}
            icon={<LocalDiningIcon />}
            title={item.name}
            href={`/backoffice/menus/${item.id}`}
          />
        ))}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Menus;
