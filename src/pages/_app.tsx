import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/dist/shared/lib/router/router';

import { ToastContainer } from 'react-toastify';

import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      <Head>
        <title>Lucas Thomazella • Dev</title>
        <link
          rel="shortcut icon"
          href="static/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
