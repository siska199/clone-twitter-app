import React from "react";
import Layout from "../layout/Layout";
import Sidebar from "./Sidebar";
import Feeds from "./Feeds";
import Search from "./Search";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";
import { dataFooter } from "../lib/data";

const HomePage = () => {

  return (
    <Layout title="hompage" customeStyle="flex ">
      <Sidebar />
      <Feeds />
      <div className="hidden lg:flex flex-[0.3] flex-col w-full gap-5 ">
        <Search />
        <Trends />
        <WhoToFollow />
        <p className="pl-14 pr-10 leading-2  text-[0.8rem] font-thin my-5  text-gray-400">
          {
            dataFooter.map((data,i)=>(
              <span key={i} className="mr-2 hover:underline cursor-pointer">
                {data}
              </span>
            ))
          }
          <br /> 
          © 2022 Twitter, Inc.
        </p>
      </div>
    </Layout>
  );
};
export default HomePage;
