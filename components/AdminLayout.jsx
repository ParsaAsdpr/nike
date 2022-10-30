import Link from "next/link";
import React from "react";

const AdminLayout = ({
  loading,
  children,
  error,
  activeIndex,
  altLoading,
  title,
}) => {
  const navlinks = [
    { text: "داشبرد", href: "/admin/dashboard" },
    { text: "سفارش ها", href: "/admin/orders" },
    { text: "محصولات", href: "/admin/products" },
    { text: "کاربران", href: "/admin/users" },
  ];

  return (
    <div
      className="grid max-w-7xl mx-auto bg-stone-800 overflow-hidden mt-5 rounded-xl text-stone-200 md:grid-cols-4 md:gap-5"
      dir="rtl"
    >
      <div className="bg-stone-900 p-3">
        <ul className="flex flex-col gap-1">
          {navlinks.map((navlink, index) => (
            <li key={index}>
              <Link href={navlink.href}>
                <a
                  className={`font-bold text-xl text-stone-100 rounded-md flex flex-row items-center justify-center bg-white py-4 ${
                    activeIndex == index ? "bg-opacity-10" : "bg-opacity-5"
                  } hover:bg-opacity-10 transition`}
                >
                  {navlink.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-3 p-10">
        <div className="flex flex-col gap-1">
          <h1 className="mb-4 text-4xl text-stone-100 font-bold">{title}</h1>
          {altLoading && <div>در حال حذف...</div>}
        </div>
        {loading ? (
          <div>در حال بارگذاری...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
