import React, { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import AddData from "./AddData";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { handleGetPosts, handleResetPosts } from "../redux/features/postSlice";

const Feeds = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value.posts);
  const hasMore = useSelector((state) => state.post.value.hasMore);
  const postRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
      root: null,
      rootMargin: "0px",
    });
    if (postRef.current) observer.observe(postRef.current);

    return () => {
      observer.disconnect(postRef?.current);
    };
  }, [postRef?.current, hasMore]);

  const handleIntersection = async (entries) => {
    if (entries[0].isIntersecting && hasMore) {
      dispatch(handleGetPosts());
    }
  };

  useEffect(() => {
    dispatch(handleGetPosts());
  }, []);

  return (
    <section className="flex-grow lg:flex-[0.9] border-gray-500 border-r-[0.005rem]">
      <nav className="px-4 flex h-[4rem] items-center justify-between top-0 sticky bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h5 className="text-xl font-bold">Home</h5>
        <BsStars size="1.5rem" />
      </nav>
      <AddData type="post" />
      {posts[0] &&
        posts.map((data, i) => {
          return posts.length - 1 == i ? (
            <Post ref={postRef} key={i} data={data} />
          ) : (
            <Post key={i} data={data} />
          );
        })}
    </section>
  );
};
export default Feeds;
