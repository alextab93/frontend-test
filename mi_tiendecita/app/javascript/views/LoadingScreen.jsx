import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center space-y-3">
        <Loader
          type="ThreeDots"
          color="black"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        <p className="text-md font-semibold">Loading...</p>
      </div>
    </div>
  );
}
