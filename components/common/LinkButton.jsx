import React from 'react';

const LinkButton = ({text, url , className}) => {
    return (
        <a className={`${className} text-green-500 text-base cursor-pointer text-center link-btn hover:scale-105 transition`} href={url}>
            {text}
        </a>
    );
};

export default LinkButton;