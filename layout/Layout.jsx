import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import RightBar from "../components/Rightbar";

const Layout = ({ children, title, customeStyle }) => {
  return (
    <>
      <Head>
        <title>Twitter clone siska199 | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-black `}>
        <article className={`container ${customeStyle} `}>
          {title !== "login" && <Sidebar />}
          <section className="flex-grow lg:flex-[0.9] border-gray-500 border-r-[0.005rem]">
             {children}
          </section>
          <RightBar />
        </article>
      </main>
    </>
  );
};
export default Layout;
