import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../assets/full-stack-high-resolution-logo-transparent.png";
import { signOut, useSession } from "next-auth/react";

const Topbar = () => {
  const { data } = useSession();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "success.main",
        height: 110,
        px: 2.5,
      }}
    >
      <Box sx={{ height: 80 }}>
        <Image
          src={logo}
          alt="logo"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Typography variant="h4" color={"secondary"}>
        Foodie-POS
      </Typography>
      {data ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            SignOut
          </Button>
        </Box>
      ) : (
        <span />
      )}
    </Box>
  );
};

export default Topbar;
