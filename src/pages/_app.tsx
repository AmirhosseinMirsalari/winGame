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
              <Component {...pageProps} />
              <ToastContainer />
              {!router.asPath.includes("user") && <Footer />}
            </PersistGate>
          </OpenLoginContextProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
