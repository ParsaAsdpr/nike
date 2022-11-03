import Link from "next/link";
import React from "react";
import { BsInstagram, BsYoutube, BsTwitter, BsFacebook } from "react-icons/bs";

const Footer = () => {
  const footerItems = [
    {
      header: "نایکی",
      items: [
        { text: "اپلیکیشن نایکی", href: "#" },
        { text: "کد تخفیف", href: "#" },
        { text: "نظرات", href: "#" },
        { text: "عضو نایکی شوید", href: "#" },
      ],
    },
    {
      header: "خدمات نایکی",
      items: [
        { text: "وضعیت سفارشات", href: "#" },
        { text: "حمل و انتقالات", href: "#" },
        { text: "پشتیبانی", href: "#" },
        { text: "بازپرداخت", href: "#" },
      ],
    },
    {
      header: "درباره نایکی",
      items: [
        { text: "اخبار", href: "#" },
        { text: "سرمایه گذاران", href: "#" },
        { text: "شعبات ما", href: "#" },
      ],
    },
  ];
  const socialLinks = [
    { component: <BsInstagram />, href: "#", text: "اینستاگرام" },
    { component: <BsYoutube />, href: "#", text: "یوتیوب" },
    { component: <BsTwitter />, href: "#", text: "تویتر" },
    { component: <BsFacebook />, href: "#", text: "فیس بوک" },
  ];
  return (
    <footer
      className="mt-5 border-t border-t-white border-opacity-25 bg-black bg-opacity-10 text-stone-100"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-6 md:px-10 gap-y-10">
          {footerItems.map((footerItem, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <h2 className="text-lg text-stone-50">{footerItem.header}</h2>
              <div className="flex flex-col gap-2">
                {footerItem.items.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <a className="text-stone-400 hover:text-stone-300 transition">
                      {item.text}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        <div className="flex flex-row justify-center items-center gap-7 col-span-1 sm:col-span-3 mt-10 lg:mt-0 lg:col-auto">
          {socialLinks.map((socialLink, index) => (
            <Link key={index} href={socialLink.href} title={socialLink.text}>
              <a className="text-2xl bg-white bg-opacity-20 hover:bg-opacity-80 transition rounded-full p-3 text-stone-900">{socialLink.component}</a>
            </Link>
          ))}
        </div>
      </div>
        <div className="py-7 bg-stone-900 border-t-white border-opacity-25 w-full text-center text-stone-400 text-sm">© ۱۴۰۱ - تمامی حقوق برای نایکی محفوظ است.</div>
    </footer>
  );
};

export default Footer;
