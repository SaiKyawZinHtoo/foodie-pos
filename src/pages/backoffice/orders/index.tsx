import NewOrder from "@/components/NewOrder";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Order
        </Button>
      </Box>
      <h1>Orders Page</h1>
      <NewOrder open={open} setOpen={setOpen} />
    </Box>
  );
};

export default OrdersPage;
