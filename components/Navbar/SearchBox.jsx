import React from 'react';
import {BiSearchAlt2} from "react-icons/bi"
import { useRouter } from 'next/router';

const SearchBox = () => {
  const [query, setQuery] = React.useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
    console.log(query)
  };

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/search?query=${query}`);
    }
    return (
        <form onSubmit={handleSubmit} className="rounded-full bg-white bg-opacity-20 text-gray-300 flex flex-row px-5 items-center">
        <input type="text" name='query' onChange={queryChangeHandler} className="w-full h-full focus:bg-transparent autofill:bg-transparent py-2 bg-transparent outline-none border-none text-right" placeholder="جستجو..."/><button type='submit'>
            <BiSearchAlt2 className="text-2xl cursor-pointer hover:text-white transition"></BiSearchAlt2>
        </button>
    </form>
    );
};

export default SearchBox;