import React from 'react';

const PrimaryButton = props => {
    return (
        <a href={props.url} className={`text-white bg-green-500 border-green-600 ${props.sm ? "px-5 py-0.5 border-2" : "px-7 py-2 border-4"} w-full h-full rounded-lg duration-200  primary-btn`}>
            {props.text}
        </a>
    );
};

export default PrimaryButton;