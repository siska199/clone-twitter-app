import React from "react";
import { BsSearch } from "react-icons/bs";
const Search = () => {
  return (
    <nav className="sticky top-0">
      <div  className="h-[4rem] px-10 py-2 bg-black flex justify-center items-center">
        <div className="w-full flex items-center  justify-center gap-2 px-5 group focus-within:border-blue-500 focus-within:border-[0.005rem] focus-within:bg-transparent bg-zinc-800 rounded-full h-full">
          <input
            type="text"
            className="w-full bg-transparent outline-none peer "
            placeholder="Search"
          />
          <BsSearch className="peer-focus:text-blue-500 text-orange text-[1.3rem]" />
        </div>
      </div>
    </nav>
  );
};

export default Search;
