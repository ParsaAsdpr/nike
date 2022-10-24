import React from 'react';

const PrimaryButton = ({text, sm, handleClick}) => {
    return (
        <button onClick={handleClick} className={`text-white bg-green-500 hover:shadow-[0_0_17px_1px_#00FF5D55] border-green-600 ${sm ? "px-5 py-0.5 border-2 rounded-md" : "px-7 py-2 border-4 rounded-lg"} w-full h-full duration-200  primary-btn`}>
            {text}
        </button>
    );
};

export default PrimaryButton;