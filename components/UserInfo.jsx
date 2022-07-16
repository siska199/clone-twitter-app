import React from "react";
import ReactTimeAgo from "react-time-ago";
import { BsDot } from "react-icons/bs";

const UserInfo = ({ data }) => {
  return (
    <section className="py-3 flex gap-4">
      <img
        className="md:h-[3rem] md:w-[3rem] h-[2rem] w-[2rem] object-cover rounded-full "
        src={data.image}
        alt=""
      />{" "}
      <div>
        <div className="flex flex-wrap sm:flex-wrap-none gap-2 mb-3 sm:mb-0">
          <h1 className="text-md font-semibold">{data.name}</h1>
          <p className="flex text-sm items-center font-thin text-slate-400 ">
            @{data.username} <BsDot />
            {<ReactTimeAgo date={Date.parse(data.createdAt)} />}
          </p>
        </div>
        <p className="text-white/80 text-[1rem] leading-[1.2rem]">
          {data.tweet}
        </p>
      </div>
    </section>
  );
};

export default UserInfo;
