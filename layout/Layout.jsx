import React from "react";
import Head from "next/head";
const Layout = ({ children, title,customeStyle}) => {
  return (
    <>
      <Head>
        <title>Twitter clone siska199 | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-black `}>
        <article className={`container ${customeStyle}`}>
          {children}
          </article>
      </main>
    </>
  );
};
export default Layout;
