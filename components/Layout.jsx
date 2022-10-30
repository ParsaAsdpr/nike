import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - نایکی" : "نایکی"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-right" theme="dark" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="mt-20">{children}</main>
        <Footer />
      </div>
    </>
  );
}
