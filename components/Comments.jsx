import React, { useEffect, useState } from "react";
import Modal from "../layout/Modal";
import AddData from "./AddData";
import UserInfo from "./UserInfo";
import {
  handleClearComments,
} from "../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ dataPost, handleModalComment }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.post.value.comments);
  const [render, setRender] = useState(false);


  useEffect(() => {
    return () => {
      dispatch(handleClearComments());
    };
  }, []);
  return (
    <Modal
      handleCloseModal={handleModalComment}
      type="modal-comments"
      style="md:w-[40rem] h-auto  py-5 no-scrollbar flex flex-col overflow-y-scroll md:rounded-3xl"
    >
      <div
        className={`${
          comments.length > 4 ? "h-[20rem]" : "h-auto"
        } overflow-scroll no-scrollbar my-5`}
      >
        <div className="sticky top-0 bg-black border-b-[0.005rem]">
          <UserInfo data={dataPost} />
        </div>

        {comments[0] &&
          comments.map((comment, i) => (
            <div key={i}>
              <UserInfo data={comment} />
            </div>
          ))}
      </div>
      <AddData
        type="comment"
        setRender={setRender}
        render={render}
        idPost={dataPost.id}
      />
    </Modal>
  );
};

export default Comments;
