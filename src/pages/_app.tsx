import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
import { store } from "@/store";
import { Theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <Layout>
            <Component {...pageProps} />
            <Snackbar />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
