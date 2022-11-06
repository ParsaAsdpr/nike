import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Store } from "../../utils/Store";
import DropdownLink from "../common/DropdownLink";
import Image from "next/image";
import SearchBox from "./SearchBox";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const [clicked, setClicked] = React.useState(false);

  const navItems = [
    { text: "محصولات", url: "/products" },
    { text: "فروش ویژه", url: "!#" },
    { text: "بلاگ", url: "!#" },
  ];

  const { status, data: session } = useSession();

  const { state, dispatch } = React.useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  React.useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <header
      className="border-b border-b-white border-opacity-10 bg-stone-900 z-50 fixed top-0 w-full"
      dir="rtl"
    >
      <nav className="max-w-7xl mx-auto flex py-5 items-center px-5 md:px-10 xl:px-4 justify-between relative">
        <div className=" w-full lg:hidden text-stone-400 text-4xl" onClick={handleClick}>
          {clicked ? <RiCloseFill className="cursor-pointer" /> : <RiMenu3Line className="cursor-pointer" />}
        </div>

        <div className="w-full">
          <div className="flex flex-row items-center justify-center lg:gap-7 lg:justify-start">
            <Link href="/" passHref>
              <Image
                src={"/images/Logo.svg"}
                alt={"logo"}
                className="cursor-pointer"
                width={50}
                height={50}
              />
            </Link>
            <div className={`${clicked ? "nav-menu active" : "nav-menu"} `}>
              {navItems.map((item, index) => (
                <Link key={index} href={item.url}>
                  <a className="text-gray-400 hover:text-gray-200 lg:py-0 py-10 hover:bg-stone-800 lg:hover:bg-transparent transition">
                    {item.text}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-row gap-5 items-center justify-end" dir="rtl">
          <SearchBox className='hidden lg:flex' />
          <Link href="/cart">
            <a
              className="p-2 text-gray-400 hover:text-gray-200 text-3xl hover:scale-110 transition relative"
              title="سبد خرید"
              href="# "
            >
              <FiShoppingCart />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>

          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button
                className="text-gray-400 hover:text-gray-200 transition flex lg:hidden flex-col items-center gap-2 justify-between"
                dir="ltr"
              >
                <p><FaUserAlt /></p>
                <BsFillTriangleFill className="text-xs rotate-180" />
              </Menu.Button>

              <Menu.Button
                className="text-gray-400 hidden hover:text-gray-200 transition border border-stone-500 bg-[#151515] rounded-full px-6 py-3 lg:flex flex-row items-center gap-5 justify-between"
                dir="ltr"
              >
                <p>{session.user.name}</p>
                <BsFillTriangleFill className="text-xs rotate-180" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 w-56 origin-top-left lg:origin-top-right top-16 bg-stone-700 text-white shadow-lg rounded-md py-1">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    ویرایش پروفایل
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order/history">
                    تاریخچه خرید ها
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
                      داشبرد ادمین
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a
                    className="dropdown-link text-red-500"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    خروج از حساب
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2 text-lg text-gray-400 hover:text-gray-200 transition">
                ورود
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
