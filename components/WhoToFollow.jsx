import React from "react";
import { dataWhoToFollow } from "../lib/data";
const WhoToFollow = () => {
  return (
    <section className=" w-full px-10 mt-5">
      <div className="bg-zinc-800 rounded-xl pt-5 flex flex-col">
        <h1 className="px-5 mb-2 text-[1.3rem] font-bold">Who to follow</h1>
        {dataWhoToFollow.map((data, i) => (
          <div
            key={i}
            className="cursor-pointer hover:bg-zinc-700 text-slate-300 px-5 py-2 flex justify-between items-center"
          >
            <div>
              <h1>{data.name}</h1>
              <p>@{data.username}</p>
            </div>
            <button>Follow</button>
          </div>
        ))}
        <div className="cursor-pointer hover:bg-zinc-700 rounded-b-lg text-slate-300 px-5 py-3 flex justify-between items-center">
          <p className="text-sky-500 text-md ">
            Show More
          </p>
        </div>
      </div>
    </section>
  );
};
export default WhoToFollow;
