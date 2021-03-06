import React, { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import AddData from "./AddData";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { handleGetPosts } from "../redux/features/postSlice";

const Feeds = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value.posts);
  const renderPosts = useSelector(state=>state.post.value.renderPosts)

  useEffect(() => {
    dispatch(handleGetPosts());
  }, [renderPosts]);

  return (
    <section className="flex-grow lg:flex-[0.9] border-gray-500 border-r-[0.005rem] min-h-[900vh] ">
      <nav className="px-4 flex h-[4rem] items-center justify-between top-0 sticky bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h5 className="text-xl font-bold">Home</h5>
        <BsStars size="1.5rem" />
      </nav>
      <AddData type="post" />
      {posts[0]&&posts.map((data, i) => (
        <Post key={i} data={data} />
      ))}
    </section>
  );
};
export default Feeds;
