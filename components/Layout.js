import Head from "next/head";
import React from "react";
import HeadInfo from "./HeadInfo";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
};

export default Layout;
