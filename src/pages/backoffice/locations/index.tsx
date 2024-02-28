import ItemCard from "@/components/ItemCard";
import NewLocation from "@/components/NewLocation";
import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const LocationPage = () => {
  const [open, setOpen] = useState(false);
  const locations = useAppSelector((state) => state.location.item);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Location
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {locations.map((item) => (
          <ItemCard key={item.id} icon={<LocationOnIcon />} title={item.name} />
        ))}
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Box>
  );
};

export default LocationPage;
