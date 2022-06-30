import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleRenderPosts } from "../redux/features/postSlice";

const Modal = ({ children, handleCloseModal, style, type }) => {
  const dispatch = useDispatch()

  const handleClose = ()=>{
    handleCloseModal()
    type=="modal-comments" && dispatch(handleRenderPosts())
  }
  return (
    <article className="h-full z-[99] w-full fixed top-0 left-0 flex backdrop-invert backdrop-opacity-5 bg-black/20 items-center justify-center">
      <div className={`bg-black p-5 ${style}`}>
        <header className="sticky top-0  bg-black">
          <button
            onClick={() => handleClose()}
            className="p-2 h-8 w-8 cursor-pointer flex rounded-full hover:bg-zinc-700"
          >
            <AiOutlineClose className="m-auto text-lg" />
          </button>
        </header>
        <section className="">{children}</section>
      </div>
    </article>
  );
};

export default Modal;
