import Layout from "@/components/Layout";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/global.css";
import { ThemeProvider } from "@mui/material";
import { Theme } from "@/utils/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
