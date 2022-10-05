import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import UserSumInfo from "./UserSumInfo";
import Comments from "./Comments";
import { BsDot } from "react-icons/bs";
import { TbDots } from "react-icons/tb";
import { GoComment } from "react-icons/go";
import { VscSync } from "react-icons/vsc";
import { BsHeart } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  handleGetComments,
  handleGetPosts,
  handleLike,
  handleResetPosts,
} from "../redux/features/postSlice";
import { handleDownloadImage } from "../lib/function";

const Post = React.forwardRef(({ data }, ref) => {
  const dispatch = useDispatch();
  const [modalComment, setModalComment] = useState(false);
  const Icons = [
    {
      name: "comment",
      icon: <GoComment />,
      data: data.comments?.length,
      style: "text-sky-600",
    },
    {
      name: "retweet",
      icon: <VscSync />,
      data: 0,
      style: "text-sky-600",
    },
    {
      name: "love",
      icon: data.likeData ? <AiFillHeart /> : <BsHeart />,
      data: data.likes?.length,
      style: `text-sky-600 ${data.likeData && "!text-rose-600"}`,
    },
    {
      name: "download",
      icon: <FiDownload />,
      data: "",
      style: "text-sky-600",
    },
  ];

  const handleOnclikIcon = async (type) => {
    switch (type) {
      case "love":
        dispatch(
          handleLike({
            idPost: data._id,
            idLove: data.likeData ? data.likeData._id : "",
          })
        ).then(async () => {
          dispatch(handleResetPosts());
          dispatch(handleGetPosts({ skip: false }));
        });
        break;
      case "comment":
        handleModalComment();
        break;
      case "download":
        await handleDownloadImage(data?.image);
        break;
      default:
        return "";
    }
  };

  const handleModalComment = () => {
    dispatch(handleGetComments(data._id));
    setModalComment((prev) => {
      if (prev) {
        dispatch(handleResetPosts());
        dispatch(handleGetPosts({ skip: true }));
      }
      return !modalComment;
    });
  };
  return (
    <section
      ref={ref}
      className="flex py-4 sm:gap-3 justify-between w-full px-3 "
    >
      <div className="flex">
        <img
          className="md:h-[3rem]  md:w-[3rem] h-[3rem] w-[3rem] object-cover rounded-full "
          src={data.user?.image}
          alt=""
        />
        <UserSumInfo />
      </div>
      <div className="flex flex-col w-[80%] sm:w-full">
        <div className="flex flex-wrap mb-3 sm:mb-0 w-full sm:flex-nowrap gap-2 items-center tracking truncate">
          <h1 className=" md:text-lg text-md font-semibold text-ellipsis overflow-hidden">
            {data.user?.name}
          </h1>

          <p className="font-thin text-slate-400 flex items-center text-ellipsis overflow-hidden">
            @{data.user?.username}
            <BsDot />
            <span className="text-sm text-ellipsis overflow-hidden">
              {<ReactTimeAgo date={Date.parse(data.createdAt)} />}
            </span>
            <span className="hover:bg-gray-900 ml-auto p-1 rounded-full">
              <TbDots className=" text-lg hover:text-sky-600 cursor-pointer " />
            </span>
          </p>
        </div>

        <p className="md:text-[0.95rem] mb-3 text-sm md:leading-[1.2rem] font-thin text-justify">
          {data.tweet}
        </p>

        <div className="flex">
          <img
            className="max-h-[15rem] sm:max-h-[25rem] object-cover rounded-3xl border-[0.05rem] border-gray-500"
            src={data.image}
            alt=""
          />
        </div>

        <div className="flex justify-between mt-5">
          {Icons[0] &&
            Icons.map((data, i) => (
              <div
                key={i}
                onClick={() => handleOnclikIcon(data.name)}
                className={`flex cursor-pointer group gap-2 hover:${data.style} items-center font-thin text-slate-400`}
              >
                <span className="group-hover:bg-gray-900 p-[0.5rem] text-lg rounded-full ">
                  {data.icon}
                </span>
                <span>{data.data}</span>
              </div>
            ))}
        </div>
      </div>
      {modalComment && (
        <Comments
          handleModalComment={handleModalComment}
          dataPost={{
            id: data._id,
            image: data.user.image,
            name: data.user.name,
            username: data.user.username,
            tweet: data.tweet,
            createdAt: data.createdAt,
          }}
        />
      )}
    </section>
  );
});
export default Post;
