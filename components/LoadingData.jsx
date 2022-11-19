import React from "react";
import Lottie from "lottie-react";
import animationData from "../public/assets/loading.json";

const LoadingData = () => {
  return (
    <div className="w-[5rem] mx-auto">
      <Lottie animationData={animationData} />
    </div>
  );
};

export default LoadingData;
