import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { Layout } from "antd";
import Head from "next/head";

import { Navbar, Footer } from "src/components";
import store from "src/app/store";

import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Takeaways - Currency</title>
        <meta
          name="description"
          content="next currency webapp with geonil jang, 장건일"
        />
        <meta name="author" content="장건일, geoniljang, takeaways" />
        <meta name="keywords" content="coin, cryptocurrency" />
      </Head>
      <div className="app">
        <nav className="navbar">
          <Navbar />
        </nav>
        <main className="main">
          <Layout>
            <div className="routes">
              <Component {...pageProps} />
            </div>
          </Layout>
          <footer className="footer">
            <Footer />
          </footer>
        </main>
      </div>
    </Provider>
  );
}
export default MyApp;
