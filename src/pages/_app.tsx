import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import createEmotionCache from "../../styles/theme/createEmotionCache";
import { theme } from "../../styles/theme";
import "../../styles/globals.css";
import Footer from "../layouts/MainLayout/Footer/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import Navbar from "layouts/MainLayout/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { OpenLoginContextProvider } from "context/openLogin";
import { useRouter } from "next/router";
import AboutUs from "./about-us";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <OpenLoginContextProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Head>
                <title>فروشگاه اینترنتی وین گیم</title>
                <link
                  rel="icon"
                  href="https://s8.uupload.ir/files/fav_seaf.png"
                />
              </Head>
              <NextNProgress height={3} color="red" />
              <Navbar />
              {router.pathname !== "/about-us" && <Component {...pageProps} />}
              {!router.asPath.includes("user") &&
                router.pathname !== "/about-us" && <Footer />}
              <ToastContainer />
            </PersistGate>
          </OpenLoginContextProvider>
        </Provider>
        {router.pathname === "/about-us" && <AboutUs />}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
