import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ScaleLoader color={'#fff'} />
    </div>
  );
};

export default Loading;
