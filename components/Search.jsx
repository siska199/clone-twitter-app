import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { handleResetPosts } from "../redux/features/postSlice";
import { handleQueryUser } from "../redux/features/userSlice";

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const controllerAbort = useRef(null);
  const inputRef = useRef(null);

  const handleOnSearch = (e) => {
    if (controllerAbort.current) {
      controllerAbort.current.abort();
    }
    const controller = new AbortController();
    const { signal } = controller;
    controllerAbort.current = controller;
    handleQueryUser(signal);
    fetch(`/api/users?q=${e.target.value}`, {
      signal,
    })
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((error) => error);
  };

  const handleChooseUser = (e, id) => {
    e.stopPropagation();
    dispatch(handleResetPosts());
    router.push(`/profile/${id}`);
    inputRef.current.value = "";
  };

  return (
    <nav className="sticky top-0">
      <div className="h-[4rem] px-10 py-2 bg-black flex justify-center items-center relative">
        <div className="w-full flex items-center relative justify-center gap-2 px-5 group focus-within:border-blue-500 focus-within:border-[0.005rem] focus-within:bg-transparent bg-zinc-800 rounded-full h-full">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent outline-none peer "
            placeholder="Search"
            onChange={(e) => handleOnSearch(e)}
          />
          <BsSearch className="cursor-pointer peer-focus:text-blue-500 text-orange text-[1.3rem] " />
          <div
            className={`bg-black w-full overflow-y-scroll display flex-col ${
              users.length < 0 ? "max-h-[7rem]" : "max-h-[20rem]"
            } ${
              inputRef.current?.value ? "!flex" : "hidden"
            } shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] absolute  top-[3.5rem] shadow-[white] rounded-md !z-[99999]`}
          >
            {users.length > 0 ? (
              users.map((data, i) => (
                <div
                  onClick={(e) => handleChooseUser(e, data._id)}
                  key={i}
                  className="flex py-2 px-4 items-center gap-2 hover:bg-slate-600 cursor-pointer"
                >
                  <img
                    className="w-[2.5rem] h-[2.5rem] rounded-full"
                    src={data.image}
                    alt=""
                  />
                  <div className="">
                    <h5>{data.name}</h5>
                    <p className="font-thin text-sm text-slate-400">
                      @{data.username}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500">
                Keywords dosent match any username
              </p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Search;
