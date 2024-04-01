import ItemCard from "@/components/ItemCard";
import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useState } from "react";

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
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addons.map((item) => (
          <ItemCard
            icon={<EggIcon />}
            key={item.id}
            title={item.name}
            href={`/backoffice/addons/${item.id}`}
          />
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonsPage;
