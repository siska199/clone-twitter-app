import React from "react";
import { uppercaseFirstLetter } from "../lib/function";
import { useRef } from "react";
const Select = ({ label, style, data,handleOnChange }) => {
  const selectRef = useRef(null);
  return (
    <div
      className={`flex items-end focus-within:border-blue-600 relative z-0 w-full group border-[0.005rem] ${style} rounded-lg border-gray-600 `}
    >
      <select
        onChange={(e)=>handleOnChange(e)}
        name={label}
        ref={selectRef}
        className="w-full cursor-pointer h-3/4 px-1 text-lg bg-black bg-transparent outline-none rounded-lg"
      >
        {data.map((data, i) => (
          <option key={i} value={data}>
            {data}
          </option>
        ))}
      </select>

      <label
        onClick={() => selectRef.current.click()}
        htmlFor={label}
        className="px-2 cursor-pointer peer-focus:text-blue-600  absolute text-gray top-2 text-sm"
      >
        {uppercaseFirstLetter(label)}
      </label>
    </div>
  );
};

export default Select;
