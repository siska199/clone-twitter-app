import React from "react";

import { useSelector, useDispatch } from "react-redux";
import Modal from "../layout/Modal";
import AddData from "./AddData";
import UserInfo from "./UserInfo";
import { handleModalComment } from "../redux/features/postSlice";
import { dataComments } from "../lib/data";

const Comments = ({ data }) => {
  const dispatch = useDispatch();
  const modelComment = useSelector((state) => state.post.value.modalComment);

  const handleCloseModal = () => {
    dispatch(handleModalComment(!modelComment));
  };

  return (
    <Modal
      handleCloseModal={handleCloseModal}
      style="md:w-[40rem] md:h-auto h-full py-5 no-scrollbar flex flex-col overflow-y-scroll md:rounded-3xl"
    >
      <div className="h-[20rem] overflow-scroll no-scrollbar my-5">
        <div className="sticky top-0 bg-black border-b-[0.005rem]">
          <UserInfo data={data} />
        </div>

        {dataComments.map((comment, i) => (
          <div key={i}>
            <UserInfo data={comment} />
          </div>
        ))}
      </div>
      <AddData type="comment" />
    </Modal>
  );
};

export default Comments;
