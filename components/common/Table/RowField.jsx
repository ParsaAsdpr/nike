import React from "react";

const RowField = ({ children, className }) => {
  return (
    <li className={`${className} p-3 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden flex flex-row items-center gap-1`}>
      {children}
    </li>
  );
};

export default RowField;
