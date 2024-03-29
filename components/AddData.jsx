import React, { useState, useRef, useEffect } from "react";
import { iconInputs } from "../lib/data";
import { BiWorld } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  handleAddPost,
  handleAddComment,
  handleGetPosts,
  handleResetPosts,
  handleGetComments,
} from "../redux/features/postSlice";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
const AddData = ({ type, idPost }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [urlFile, setUrlFile] = useState(null);
  const initialValueForm = {
    tweet: "",
    image: null,
  };
  const [form, setForm] = useState(initialValueForm);
  const [seeEmoji, setSeeEmoji] = useState(false);

  const handleClickIcon = (name) => {
    if (name == "picture") return imgRef.current.click();
    if (name == "emoji") return setSeeEmoji(!seeEmoji);
  };
  const handleCloseImage = () => {
    setUrlFile(null);
    setForm({
      ...form,
      image: initialValueForm.image,
    });
    imgRef.current.value = null;
  };
  const handleOnchange = (e) => {
    if (e.target.name == "image" && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setUrlFile(readerEvent.target.result);
      };
    }
    setForm({
      ...form,
      [e.target.name]:
        e.target.name == "image" ? e.target.files[0] : e.target.value,
    });
  };
  const handleOnClickEmoji = (data, event) => {
    event.stopPropagation();
    setForm({
      ...form,
      tweet: `${form.tweet}${data.emoji}`,
    });
  };
  const handleOnSubmit = async (e) => {
    e && e.preventDefault();
    switch (type) {
      case "post":
        dispatch(handleAddPost(form)).then(() => {
          setForm(initialValueForm);
          dispatch(handleResetPosts());
          dispatch(handleGetPosts(true));
        });
        break;
      case "comment":
        const formComment = {
          comment: form.tweet,
        };
        dispatch(handleAddComment({ idPost, formComment })).then(() => {
          setForm(initialValueForm);
          dispatch(handleGetComments(idPost));
        });
        break;
      default:
        return "";
    }
  };
  const handleSubmitByPressEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleOnSubmit();
    }
  };
  useEffect(() => {}, []);

  return (
    <form
      className={` ${type == "post" && "px-6 py-3"}  flex gap-4 ${
        type == "post" && "border-b-[0.005rem]"
      } border-gray-500 w-full`}
    >
      <img
        className="h-[3rem] w-[3rem] object-cover rounded-full"
        src={session?.user?.image}
        alt=""
      />
      <div className="flex flex-col md:w-full w-[80%]">
        <div
          className={`${
            type == "post" && "border-b-[0.005rem]"
          } border-gray-500 pb-4`}
        >
          <textarea
            onKeyDown={handleSubmitByPressEnter}
            name="tweet"
            placeholder={`${
              type == "post" ? "What's happening?" : "Tweet your reply"
            }`}
            rows={type == "post" ? 3 : 1}
            onChange={(e) => handleOnchange(e)}
            value={form.tweet}
            className="mt-3 outline-none no-scrollbar placeholder:text-xl placeholder:font-thin w-full bg-transparent "
          ></textarea>
          {form.image && (
            <div className="relative">
              <span className="absolute cursor-pointer top-2 left-2 text-lg bg-black/40 hover:bg-black/60 backdrop-blur-lg p-3 rounded-full">
                <AiOutlineClose onClick={() => handleCloseImage()} />
              </span>
              <img
                src={urlFile}
                alt=""
                className="max-h-[25rem] object-cover rounded-3xl border-[0.05rem] border-gray-500"
              />
            </div>
          )}

          {type == "post" && (
            <p className="text-sky-600 mt-3 flex items-center gap-2">
              <BiWorld />
              <span>Everyone can reply</span>
            </p>
          )}
        </div>
        <div className="flex justify-between  items-center">
          {type == "post" && (
            <ul className="flex gap-[0.2rem]">
              {iconInputs[0] &&
                iconInputs.map((data, i) => (
                  <li
                    onClick={() => handleClickIcon(data.name)}
                    key={i}
                    className={`${i == 4 && "hidden md:block"} ${
                      i == 2 && "hidden md:block"
                    }  text-lg relative text-sky-600 cursor-pointer hover:bg-gray-900 p-2 rounded-full my-3`}
                  >
                    {data.icon}
                    {data.name == "picture" && (
                      <input
                        ref={imgRef}
                        onChange={(e) => handleOnchange(e)}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="image"
                        hidden
                      />
                    )}
                    {data.name == "emoji" && (
                      <div className="absolute top-[2.5rem] -left-[8rem]">
                        {seeEmoji && (
                          <EmojiPicker onEmojiClick={handleOnClickEmoji} />
                        )}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
          <button
            onClick={(e) => handleOnSubmit(e)}
            className={`bg-sky-600 w-[7rem] ${
              type == "comment" && "ml-auto"
            } py-[0.35rem] rounded-full disabled:opacity-75 `}
            disabled={form.tweet ? false : true}
          >
            {type == "post" ? "Tweet" : "Reply"}
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddData;
