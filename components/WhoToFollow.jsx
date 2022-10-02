import React from "react";
import { dataWhoToFollow } from "../lib/data";
const WhoToFollow = () => {
  return (
    <section className=" px-10 mt-5">
      <div className="bg-zinc-800  rounded-xl pt-5 flex flex-col">
        <h1 className="px-5 mb-2 text-[1.3rem] font-bold">Who to follow</h1>
        {dataWhoToFollow[0]&&dataWhoToFollow.map((data, i) => (
          <div
            key={i}
            className="cursor-pointer hover:bg-zinc-700 text-slate-300 px-5 py-4 flex justify-between items-center"
          >
            <div className="flex gap-2 flex-wrap">
              <img src={data.image} className="w-[3rem] h-[3rem] object-cover rounded-full" alt="" />
              <div>
                <h1 className="text-white font-bold text-lg">{data.name}</h1>
                <p className="text-[1.1rem] font-thin">@{data.username}</p>
              </div>
            </div>
            <button className="bg-white text-black font-medium px-3 py-1 rounded-full">Follow</button>
          </div>
        ))}
        <div className="cursor-pointer hover:bg-zinc-700 rounded-b-lg text-slate-300 px-5 py-3 flex justify-between items-center">
          <p className="text-sky-500 text-md ">Show More</p>
        </div>
      </div>
    </section>
  );
};
export default WhoToFollow;
