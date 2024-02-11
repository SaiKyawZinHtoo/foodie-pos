import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import Topbar from "./Topbar";
import SlideBar from "./SlideBar";
import { useSession } from "next-auth/react";
import { apiBaseUrl } from "next-auth/client/_utils";
import { config } from "@/utils/config";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data } = useSession();

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/app`);
    const dataFromServer = await response.json();
    console.log(dataFromServer);
  };
  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex", position: "relative" }}>
        {data && <SlideBar />}
        <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
