import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { Location } from "@prisma/client";

const SettingPage = () => {
  const locations = useAppSelector((state) => state.location.item);
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(undefined);

  useEffect(() => {
    const locationId = localStorage.getItem("selectedLocationId");
    if (locationId) {
      const selectedLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setSelectedLocation(selectedLocation);
    } else {
      const firstLocation = locations[0];
      setSelectedLocation(firstLocation);
    }
  }, [locations]);

  const handleLocationChange = (evt: SelectChangeEvent<number>) => {
    const selectedLocation = locations.find(
      (item) => item.id === evt.target.value
    );
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
      localStorage.setItem("selectedLocationId", String(selectedLocation.id));
    }
  };

  return (
    <Box sx={{ m: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Locations</InputLabel>
        <Select
          value={selectedLocation?.id || ""}
          label="location"
          onChange={handleLocationChange}
        >
          {locations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SettingPage;
