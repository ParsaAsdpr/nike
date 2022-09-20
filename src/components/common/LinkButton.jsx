import React from 'react';

const LinkButton = props => {
    return (
        <a className='text-green-500 text-lg cursor-pointer link-btn hover:scale-105 transition' href={props.url}>
            {props.text}
        </a>
    );
};

export default LinkButton;