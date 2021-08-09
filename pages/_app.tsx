import "../styles/index.scss";

import { Layout } from "../components";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { Provider } from 'react-redux';
import { store } from 'store';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
