import { BsArrowLeft } from "react-icons/bs";

const CustomRightArrow = ({ onClick }) => {

    // onMove means if dragging or swiping in progress.
    return (
      <button
        className={`p-4 text-xl border text-stone-800 border-stone-800 rotate-180 absolute z-50
         right-0 bottom-0 hover:text-white hover:bg-stone-800 transition hidden md:block`}
        onClick={() => onClick()}
      >
        <BsArrowLeft />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    // onMove means if dragging or swiping in progress.
    return (
      <button
        className="p-4 text-xl border text-stone-800 border-stone-800 absolute z-50
         left-0 bottom-0 hover:text-white hover:bg-stone-800 transition hidden md:block"
        onClick={() => onClick()}
      >
        <BsArrowLeft />
      </button>
    );
  };

export {CustomLeftArrow, CustomRightArrow}