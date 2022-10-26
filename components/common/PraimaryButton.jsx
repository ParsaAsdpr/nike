import React from "react";

const PrimaryButton = ({ text, sm, handleClick, disabled, className }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`text-white bg-green-500 hover:shadow-[0_0_17px_1px_#00FF5D55] border-green-600 ${
        sm
          ? "px-5 py-1 border-2 rounded-md"
          : "px-7 py-3 border-4 text-lg rounded-lg"
      } w-full h-full duration-200  primary-btn ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
