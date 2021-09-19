import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Layout, Typography, Space } from "antd";
import { Navbar, Footer } from "src/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <nav className="nav">
        <Navbar />
      </nav>
      <main className="main">
        <Layout>
          <div className="routes">
            <Component {...pageProps} />
          </div>
        </Layout>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
export default MyApp;
