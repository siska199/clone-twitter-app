import React from "react";
import { menuIcons } from "../lib/data";
import Icon from "./Icon";
import { BsTwitter } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <section className="fixed bottom-0 sm:relative  bg-black  w-full flex-[0.1] lg:pl-[2rem] py-3 px-2 border-r-[0.005rem] border-gray-500 ">
      <div className="sticky top-0  sm:h-[100vh] overflow-y-scroll no-scrollbar lg:items-start justify-between  gap-6  ">
        <div className="">
          <button className="hidden sm:block hover:bg-zinc-900 ml-1 mb-3 rounded-full p-2">
            <BsTwitter size="1.7rem" className="" />
          </button>
          <div className="flex sm:block justify-between">
            {menuIcons[0] &&
              menuIcons.map((data, i) => (
                  <Icon key={i} data={data} />
              ))}
            <button
              className={`flex sm:hidden gap-4  cursor-pointer rounded-full text-white  hover:bg-zinc-900 w-auto  justify-start items-center px-3 py-[0.7rem] text-[1.2rem]`}
            >
              <div className="text-[1.7rem] font-thin">
                <BsSearch />
              </div>
            </button>
          </div>
          <button className="hidden sm:block mx-auto sm:h-[2.5rem] sm:w-[2.5rem] md:h-auto lg:w-[90%] sm:text-[0.7rem]  bg-sky-600 hover:bg-sky-700 mt-3 w-[100%] rounded-full py-3 font-bold md:text-md lg:text-lg">
            Tweet
          </button>
        </div>

        <div className="hidden sm:flex mt-8 ">
          <button
            onClick={() => signOut()}
            className="lg:w-full lg:h-[4rem] mx-auto flex gap-2 justify-between items-center rounded-full hover:bg-zinc-900 lg:p-3"
          >
            <img
              className="lg:h-[2.3rem] lg:w-[2.5rem] h-[2.5rem] w-[2.5rem] object-cover rounded-full"
              src={session?.user?.image}
              alt=""
            />
            <div className="hidden lg:flex flex-col text-left truncate ">
              <div className="flex items-center">
                <h5 className="font-bold text-ellipsis overflow-hidden">
                  {session?.user?.name}
                </h5>
                <FaLock />
              </div>
              <p className="font-thin text-sm text-gray-400">
                @{session?.user?.username}
              </p>
            </div>
            <MdOutlineMoreHoriz size="1.4rem" className="hidden lg:block" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Sidebar;
