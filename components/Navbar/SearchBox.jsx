import React from 'react';
import {BiSearchAlt2} from "react-icons/bi"

const SearchBox = () => {
    return (
        <div className="rounded-full bg-white bg-opacity-20 text-gray-300 flex flex-row px-5 items-center">
        <input type="text" className="w-full h-full rounded-full py-2 bg-transparent outline-none border-none text-right" placeholder="جستجو..."/>
        <BiSearchAlt2 className="text-2xl cursor-pointer hover:text-white transition"></BiSearchAlt2>
    </div>
    );
};

export default SearchBox;