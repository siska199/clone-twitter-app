import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { handleLike } from "../redux/features/postSlice";
import { useSession } from "next-auth/react";
import { handleModalComment } from "../redux/features/postSlice";

const Post = ({ data, setRender, render }) => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const modalComment = useSelector((state) => state.post.value.modalComment);
  const Icons = [
    {
      name: "comment",
      icon: <GoComment />,
      data: data.comments.length,
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
      icon: data.likeData.like ? <AiFillHeart /> : <BsHeart />,
      data: data.likes.length,
      style: `text-sky-600 ${data.likeData.like && "!text-rose-600"}`,
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
            form: {
              like: data.likeData ? false : true,
            },
          })
        ).then(() => setRender(!render));
        break;
      case "comment":
        dispatch(handleModalComment(!modalComment));
        break;
      default:
        return "";
    }
  };
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
              {<ReactTimeAgo date={Date.parse(data.createdAt)} />}
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
      {modalComment && <Comments data={data} />}
    </section>
  );
};
export default Post;
