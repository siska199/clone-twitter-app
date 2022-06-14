import React from "react";
import { dataTrends } from "../lib/data";
import { BsThreeDots } from "react-icons/bs";
const Trends = () => {
  return (
    <section className="px-10">
      <div className="bg-zinc-800  rounded-xl pt-5 flex flex-col">
        <h1 className="px-5 mb-2 text-[1.3rem] font-bold">Trends For You</h1>
        {dataTrends.map((data, i) => (
          <div
            onClick={() => alert("Oke gais")}
            key={i}
            className="cursor-pointer hover:bg-zinc-700 text-slate-300 px-5 py-2 flex justify-between items-center"
          >
            <div>
              <label htmlFor="" className="text-sm font-thin">
                {data.type}
              </label>
              <h1 className="text-white font-semibold">{data.hastag}</h1>
              <p>{data.tweet}</p>
            </div>
            <BsThreeDots onClick={(e) => e.stopPropagation()} className="" />
          </div>
        ))}
        <div className="cursor-pointer hover:bg-zinc-700 rounded-b-lg text-slate-300 px-5 py-3 flex justify-between items-center">
          <p className="text-sky-500 text-md ">Show More</p>
        </div>{" "}
      </div>
    </section>
  );
};
export default Trends;
