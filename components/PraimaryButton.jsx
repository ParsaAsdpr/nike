import React from 'react';

const PrimaryButton = ({text, sm, handleClick}) => {
    return (
        <button onClick={handleClick} className={`text-white bg-green-500 hover:bg-green-600 border-green-600 ${sm ? "px-5 py-0.5 border-2" : "px-7 py-2 border-4"} w-full h-full rounded-lg duration-200  primary-btn`}>
            {text}
        </button>
    );
};

export default PrimaryButton;