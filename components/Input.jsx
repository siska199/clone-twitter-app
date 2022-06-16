import React from "react";
import { uppercaseFirstLetter } from "../lib/function";

const Input = ({ label, style, type, handleOnChange }) => {
  return (
    <div
      className={`flex items-end focus-within:border-blue-600 relative z-0 w-full group border-[0.005rem] ${style} rounded-lg border-gray-600 `}
    >
      <input
        type={type}
        name={label}
        className="block px-2 h-3/4 w-full text-lg text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={(e)=>handleOnChange(e)}        
      />
      <label
        htmlFor={label}
        className="flex px-2 w-full peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 top-4 -z-10 origin-[0]  peer-focus:text-blue-600  peer-placeholder-shown:text-lg peer-placeholder-shown:translate-y-0 text-sm peer-focus:text-sm peer-focus:-translate-y-3"
      >
        {uppercaseFirstLetter(label)}
      </label>
    </div>
  );
};

export default Input;
