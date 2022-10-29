import React from "react";

const DangerButton = ({ text, sm, handleClick, className }) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} text-white flex flex-row justify-center items-center bg-red-500 hover:shadow-[0_0_17px_1px_#ff00007a] border-red-600 ${
        sm
          ? "px-5 py-1 border-2 rounded-md"
          : "px-7 py-3 border-4 text-lg rounded-lg"
      } w-full h-full duration-200  primary-btn`}
    >
      {text}
    </button>
  );
};

export default DangerButton;
