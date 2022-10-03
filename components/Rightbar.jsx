import React from "react";
import Search from "./Search";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";
import { dataFooter } from "../lib/data";

const Rightbar = () => {
  return (
    <div className="hidden lg:flex flex-[0.5] flex-col w-full gap-5 ">
      <Search />
      <div className="">
        <Trends />
        <WhoToFollow />
        <p className="pl-14 pr-10 leading-2  text-[0.8rem] font-thin my-5  text-gray-400">
          {dataFooter[0] &&
            dataFooter.map((data, i) => (
              <span key={i} className="mr-2 hover:underline cursor-pointer">
                {data}
              </span>
            ))}
          <br />© 2022 Twitter, Inc.
        </p>
      </div>
    </div>
  );
};

export default Rightbar;
