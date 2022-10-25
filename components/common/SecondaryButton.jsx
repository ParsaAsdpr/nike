import React from 'react';

const SecondaryButton = ({text, sm, handleClick}) => {
    return (
        <button onClick={handleClick} className={`text-white bg-blue-500 hover:shadow-[0_0_17px_1px_#0051ff75] border-blue-600 ${sm ? "px-5 py-1 border-2 rounded-md" : "px-7 py-3 border-4 text-lg rounded-lg"} w-full h-full duration-200  primary-btn`}>
            {text}
        </button>
    );
};

export default SecondaryButton;