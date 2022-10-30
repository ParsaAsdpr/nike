import React from "react";

export const TextBox = ({ type, error, id, validation, text, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-semibold text-lg">
        {text}
      </label>
      <input
        type={type}
        {...validation}
        className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${
          error && "border-red-500"
        }`}
        id={id}
        autoFocus
      ></input>
      {error && (
        <div className="text-red-500 text-xs pt-3">{error.message}</div>
      )}
    </div>
  );
};
