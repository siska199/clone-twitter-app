import React from "react";
import ReactTimeAgo from "react-time-ago";
import UserSumInfo from "./UserSumInfo";
import { BsDot } from "react-icons/bs";
import { TbDots } from "react-icons/tb";
import { GoComment } from "react-icons/go";
import { VscSync } from "react-icons/vsc";
import { BsHeart } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
const Post = ({ data }) => {
  console.log("data post: ", data);
  const Icons = [
    {
      name: "comment",
      icon: <GoComment />,
      data: data.comments.length,
      colorText: "text-sky-600",
    },
    {
      name: "retweet",
      icon: <VscSync />,
      data: 0,
      colorText: "text-sky-600",
    },
    {
      name: "love",
      icon: <BsHeart />,
      data: data.likes.length,
      colorText: "text-sky-600",
    },
    {
      name: "download",
      icon: <FiDownload />,
      data: "",
      colorText: "text-sky-600",
    },
  ];

  
  return (
    <section className="flex py-4 gap-3 w-full">
      <div>
        <img
          className="md:h-[3rem] ml-6 md:w-[3rem] h-[2rem] w-[2rem] object-cover rounded-full "
          src={data.user.image}
          alt=""
        />
        <UserSumInfo />
      </div>
      <div className="flex flex-col w-[80%] ">
        <div className="flex gap-2 items-center tracking truncate">
          <h1 className=" md:text-lg text-md  font-semibold text-ellipsis overflow-hidden">
            {data.user.name}
          </h1>

          <p className="font-thin text-slate-400 flex items-center text-ellipsis overflow-hidden">
            @{data.user.username}
            <BsDot />
            <span className="text-sm text-ellipsis overflow-hidden">
              {<ReactTimeAgo date={data.createdAt} />}
            </span>
          </p>
          <span className="hover:bg-gray-900 ml-auto p-1 rounded-full">
            <TbDots className=" text-lg hover:text-sky-600 cursor-pointer " />
          </span>
        </div>

        <p className="md:text-[0.95rem] text-sm md:leading-[1.2rem] font-thin text-justify">
          {data.tweet}
        </p>

        <div className="flex mt-3">
          <img
            className="max-h-[25rem] object-cover rounded-3xl border-[0.05rem] border-gray-500"
            src={data.image}
            alt=""
          />
        </div>

        <div className="flex justify-between mt-5">
          {Icons.map((data, i) => (
            <div
              key={i}
              className={`flex cursor-pointer group gap-2 hover:${data.colorText} items-center font-thin text-slate-400`}
            >
              <span className="group-hover:bg-gray-900 p-[0.5rem] text-lg rounded-full ">
                {data.icon}
              </span>
              <span>{data.data}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Post;
