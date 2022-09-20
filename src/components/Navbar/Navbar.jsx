import React from "react";
import Logo from "../../../public/images/Logo.svg";
import SearchBox from "./SearchBox";
import {FiShoppingCart, FiHeart} from "react-icons/fi"
import Image from "next/image";

const Navbar = () => {
  const [navItems] = React.useState([
    { text: "محصولات", url: "!#" },
    { text: "فروش ویژه", url: "!#" },
    { text: "بلاگ", url: "!#" },
  ]);
  return (
    <nav className="border-b border-b-white py-6 border-opacity-10 w-full fixed top-0 bg-stone-900 z-50 px-10 xl:px-0">
      {/* NAVBAR CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto flex justify-between">
        {/* RIGHT SIDE OF NAVBAR */}
        <div className="flex flex-row items-center">
            {/* LOGO */}
            <a className="w-12 cursor-pointer" href="/">
          <Image src={Logo} alt="Logo" className="w-full" />
            </a>
          {/* NAVBAR LINKS */}
          <div className="flex flex-row gap-10 mr-20 items-center">
            {navItems.map((item, index) => (
              <a
                className="text-gray-400 cursor-pointer hover:text-gray-200 transition"
                key={index}
                href={item.url}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
        {/* LEFT SIDE OF NAVBAR */}
        <div className="flex flex-row-reverse">
            {/* CART AND FAVORITES */}
            <div className="px-10 flex flex-row gap-8 items-center">
            <a className="text-white text-3xl cursor-pointer hover:scale-110 transition" title="سبد خرید" href="# ">
                <FiShoppingCart></FiShoppingCart>
            </a>
            <a className="text-white text-3xl cursor-pointer hover:scale-110 transition" title="علاقه مندی ها" href="# ">
                <FiHeart></FiHeart>
            </a>
            </div>
            {/* SEARCH BOX */}
            <SearchBox></SearchBox>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
