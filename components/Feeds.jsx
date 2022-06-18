import React, { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import AddData from "./AddData";
import Post from "./Post";
import { dataPostsFaker as dataPosts } from "../lib/data";

const Feeds = () => {
  return (
    <section className="flex-grow lg:flex-[0.9] border-gray-500 border-r-[0.005rem] min-h-[900vh] ">
      <nav className="px-4 flex h-[4rem] items-center justify-between top-0 sticky bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h5 className="text-xl font-bold">Home</h5>
        <BsStars size="1.5rem" />
      </nav>
      <AddData type="post" />
      {dataPosts.map((data, i) => (
        <Post key={i} data={data} />
      ))}
    </section>
  );
};
export default Feeds;
