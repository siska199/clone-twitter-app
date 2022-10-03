import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <nav className="sticky top-0">
      <div  className="h-[4rem] px-10 py-2 bg-black flex justify-center items-center relative">
        <div className="w-full flex items-center relative justify-center gap-2 px-5 group focus-within:border-blue-500 focus-within:border-[0.005rem] focus-within:bg-transparent bg-zinc-800 rounded-full h-full">
          <input
            type="text"
            className="w-full bg-transparent outline-none peer "
            placeholder="Search"
          />
          <BsSearch className="peer-focus:text-blue-500 text-orange text-[1.3rem] " />
          <div className="bg-black w-full min-h-[7rem] hidden peer-focus:block shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] absolute  top-[3.5rem] shadow-[white] rounded-md !z-[99999]">
            <p className="p-4 text-gray-500">Try searching for people, topics, or keywords</p>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Search;
