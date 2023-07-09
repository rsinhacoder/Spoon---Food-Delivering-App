import React from "react";
import loading from "../../assets/loading-animation.gif";

const Loading = () => {
  return (
    <div className="w-[100vw] md:h-[100vh] h-[50vh] flex justify-center">
      <img
        src={loading}
        alt="Loading-animation"
        className="w-[40%] h-[70%] rounded-[50%] my-auto"
      />
    </div>
  );
};

export default Loading;
