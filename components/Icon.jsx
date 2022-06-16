import React from "react";

const Icon = ({ data }) => {
  return (
    <button className={`${!data.important&&"hidden"} sm:flex  gap-4 cursor-pointer rounded-full text-white  hover:bg-zinc-900 w-auto  justify-start items-center px-3 py-[0.7rem] text-[1.2rem]`}>
      <div className="text-[1.7rem] font-thin">{data.icon}</div>
      <div className="hidden lg:block">{data.name}</div>
    </button>
  );
};
export default Icon;