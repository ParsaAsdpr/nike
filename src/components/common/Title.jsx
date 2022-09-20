import React from 'react';

const Title = props => {
    return (
        <div className='w-full border-b border-white border-opacity-20'>
            <div className='max-w-7xl mx-auto flex'>
            <div className='pl-20 pr-3 py-5 border-b-4 border-green-500 text-white text-xl relative -bottom-0.5'>{props.text}</div>
            </div>
        </div>
    );
};

export default Title;