<header
className="border-b border-b-white border-opacity-10 bg-stone-900 z-50 fixed top-0 w-full"
dir="rtl"
>
<nav className="max-w-7xl mx-auto flex py-5 items-center px-10 xl:px-0 justify-between">
  <div className="flex flex-row items-center">
    <Link href="/" passHref>
      <Image
        src={"/images/Logo.svg"}
        alt={"logo"}
        className="cursor-pointer"
        width={50}
        height={50}
      />
    </Link>
    <div className="flex flex-row gap-10 mr-20 items-center">
      {navItems.map((item, index) => (
        <Link key={index} href={item.url}>
          <a className="text-gray-400 hover:text-gray-200 transition">
            {item.text}
          </a>
        </Link>
      ))}
    </div>
  </div>
  <div className="flex flex-row gap-5 items-center">
    <SearchBox />
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
          className="text-gray-400 hover:text-gray-200 transition border border-stone-500 bg-[#151515] rounded-full px-6 py-3 flex flex-row items-center gap-5 justify-between"
          dir="ltr"
        >
          <p>{session.user.name}</p>
          <BsFillTriangleFill className="text-xs rotate-180" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 origin-top-right top-16 bg-stone-700 text-white shadow-lg rounded-md py-1">
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

{status === "loading" ? (
    "Loading"
  ) : session?.user ? (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        className="text-gray-400 hover:text-gray-200 transition border border-stone-500 bg-[#151515] rounded-full px-6 py-3 flex flex-row items-center gap-5 justify-between"
        dir="ltr"
      >
        <p>{session.user.name}</p>
        <BsFillTriangleFill className="text-xs rotate-180" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 w-56 origin-top-right top-16 bg-stone-700 text-white shadow-lg rounded-md py-1">
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