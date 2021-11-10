import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap//
import Head from "next/head"; // Head Tag//
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../Components/navbar";
import { UserProvider } from "../context";
import "antd/dist/antd.css";
import '../public/css/follow.css';
import '../public/css/newsfeed.css';
import '../public/css/dashboard.css';

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /*Material UI */
          />
          <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.bubble.css" />

          <link rel="stylesheet" href="./css/index.css" />
          <link rel="stylesheet" href="./css/login.css" />
          
        </Head>
        <Navbar />
        <ToastContainer position="bottom-right" pauseOnFocusLoss={false} style={{fontStyle:"italic",fontFamily:'Shadows Into Light',}} />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
