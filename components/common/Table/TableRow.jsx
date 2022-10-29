import React from 'react';

const TableRow = ({children, cols}) => {
  let col;
  switch (cols) {
    case 1:
      col = "grid-cols-1";
      break;
    case 2:
      col = "grid-cols-2";
      break;
    case 3:
      col = "grid-cols-3";
      break;
    case 4:
      col = "grid-cols-4";
      break;
    case 5:
      col = "grid-cols-5";
      break;
    case 6:
      col = "grid-cols-6";
      break;
    case 7:
      col = "grid-cols-7";
      break;
    case 8:
      col = "grid-cols-8";
      break;
    case 9:
      col = "grid-cols-9";
      break;
    case 10:
      col = "grid-cols-10";
      break;

    case 11:
      col = "grid-cols-11";
      break;

    case 12:
      col = "grid-cols-12";
      break;
  }

    return (
        <ul className={`w-full grid ${col} border-b text-stone-400 border-b-white border-opacity-10`}>
        {children}
      </ul>
  
    );
};

export default TableRow;