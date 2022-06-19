import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/assets/loading.json";

const LoadingPage = () => {
  return (
    <div className="fixed w-full h-full text-white bg-black/80 flex justify-center items-center">
      <Lottie animationData={animationData} />
    </div>
  );
};

export default LoadingPage;
