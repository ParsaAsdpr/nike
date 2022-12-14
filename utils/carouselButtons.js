import { MdOutlineArrowForwardIos } from "react-icons/md";

const CustomRightArrow = ({ onClick }) => {

    // onMove means if dragging or swiping in progress.
    // className={`p-4 text-xl border text-stone-800 border-stone-800 rotate-180 absolute z-50
    //      right-0 bottom-0 hover:text-white hover:bg-stone-800 transition hidden md:block`}
    return (
      <button
      className="text-stone-800 rounded-full p-2 absolute text-base bg-white hover:scale-110 opacity-50 bottom-0 z-40"
      style={{right: '1rem'}}
        onClick={() => onClick()}
      >
        <MdOutlineArrowForwardIos />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    // onMove means if dragging or swiping in progress.
    return (
      <button
        className="text-stone-800 rounded-full p-2 absolute text-base bg-white opacity-50 rotate-180 hover:scale-110 transition bottom-0 z-40"
        style={{left: '1rem'}}
        onClick={() => onClick()}
      >
        <MdOutlineArrowForwardIos />
      </button>
    );
  };

export {CustomLeftArrow, CustomRightArrow}