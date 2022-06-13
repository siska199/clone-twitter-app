import React from "react";
import Layout from "../layout/Layout";
import Sidebar from "./Sidebar";
import Feeds from "./Feeds";
import Search from "./Search";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow"
const HomePage = () => {
  return (
    <Layout title="hompage" customeStyle="flex ">
      <Sidebar />
      <Feeds />
      <div className="hidden lg:flex w-full flex-col gap-5 ">
        <Search />
        <Trends />
        <WhoToFollow/>
      </div>
    </Layout>
  );
};
export default HomePage;
