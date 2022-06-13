import React from "react";
import { iconInputs } from "../lib/data";

const AddPost = () => {
  return (
    <form className="px-6 py-3 flex gap-4 border-b-[0.005rem] border-gray-500 w-full">
      <img
        className="h-[3rem] w-[3rem] object-cover rounded-full"
        src="https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?w=2000"
        alt=""
      />
      <div className="flex flex-col md:w-full w-[80%]">
        <textarea
          placeholder="What's happening?"
          rows={3}
          className="mt-3 outline-none placeholder:text-xl placeholder:font-thin w-full bg-transparent border-b-[0.005rem] border-gray-500"
        ></textarea>
        <div className="flex justify-between items-center">
          <ul className="flex gap-[0.2rem]">
            {iconInputs.map((data, i) => (
              <li key={i} className={`${i==4&&"hidden md:block"} ${i==2&&"hidden md:block"}  text-lg text-sky-600 cursor-pointer hover:bg-gray-900 p-2 rounded-full my-3`}>
                {data.icon}
              </li>
            ))}
          </ul>
          <button
            className="bg-sky-600 w-[5rem] py-[0.35rem] rounded-full disabled:opacity-75 "
            disabled
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddPost;
