import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import RightBar from "../components/Rightbar";
import LoadingPage from "../components/LoadingPage";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const Layout = ({ children, title, customeStyle }) => {
  const loading = useSelector((state) => state.post.value.loading);

  return (
    <>
      <Head>
        <title>Twitter clone siska199 | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-black `}>
        <article className={`container ${customeStyle} `}>
          {title != "login" ? (
            <>
              <Sidebar />
              <section className="flex-grow lg:flex-[0.9] border-gray-500 border-r-[0.005rem]">
                {children}
              </section>
              <RightBar />
              {loading && <LoadingPage />}
            </>
          ) : (
            <>{children}</>
          )}
        </article>
      </main>
    </>
  );
};
export default Layout;
