import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box>
      <Box
        sx={{
          height: 80,
          bgcolor: "#4CB9E7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Foodie POS - Backed Office</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: 290,
            bgcolor: "#3559E0",
            color: "#FFECD6",
            minHeight: "100vh",
          }}
        >
          <Link href={"/backoffice/menu"} style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <MenuBookIcon sx={{ fontSize: 40, color: "#FFECD6" }} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ fontSize: 21 }}>Menu</Typography>}
              />
            </ListItemButton>
          </Link>
          <Link
            href={"/backoffice/menu-category"}
            style={{ textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon sx={{ fontSize: 40, color: "#FFECD6" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 21 }}>Menu Category</Typography>
                }
              />
            </ListItemButton>
          </Link>
        </Box>
        <Box sx={{ pl: 3, pt: 3, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
