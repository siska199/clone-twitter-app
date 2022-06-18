import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ children, handleCloseModal, style }) => {
  return (
    <article className="h-full z-[99] w-full fixed flex backdrop-opacity-10 backdrop-invert bg-white/10 items-center justify-center">
      <div className={`bg-black px-5 pb-5 ${style}`}>
        <header className="sticky top-0 pt-5 bg-black">
          <button
            onClick={() => handleCloseModal()}
            className="p-2 h-8 w-8 cursor-pointer flex rounded-full hover:bg-zinc-700"
          >
            <AiOutlineClose className="m-auto " />
          </button>
        </header>
        <section className="px-10 py-5">{children}</section>
      </div>
    </article>
  );
};

export default Modal;
