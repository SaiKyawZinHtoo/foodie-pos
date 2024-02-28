import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const AddonsPage = () => {
  const [open, setOpen] = useState(false);
  const addons = useAppSelector((state) => state.addon.item);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Addons
        </Button>
      </Box>
      <Box>
        {addons.map((item) => (
          <Typography key={item.id}>{item.name}</Typography>
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonsPage;
