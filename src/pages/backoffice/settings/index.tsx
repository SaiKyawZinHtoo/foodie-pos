import NewSetting from "@/components/NewSetting";
import { Box, Button } from "@mui/material";
import React, { use, useState } from "react";

const SettingPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Setting
        </Button>
      </Box>
      <h1>Setting Page</h1>
      <NewSetting open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SettingPage;
