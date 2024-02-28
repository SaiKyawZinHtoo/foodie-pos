import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import Topbar from "./Topbar";
import SlideBar from "./SlideBar";
import { useSession } from "next-auth/react";
import { apiBaseUrl } from "next-auth/client/_utils";
import { config } from "@/utils/config";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slice/appSlice";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const {init} = useAppSelector(state => state.app)

  useEffect(() => {
    if(session && !init)
    dispatch(fetchAppData({}));
  }, [session]);

  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex", position: "relative" }}>
        {session && <SlideBar />}
        <Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
