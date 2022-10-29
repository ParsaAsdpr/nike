import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import PrimaryButton from "../components/common/PraimaryButton";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Table from "../components/common/Table/Table";
import RowField from "../components/common/Table/RowField";
import TableRow from "../components/common/Table/TableRow";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("متاسفیم، کالا مورد نظر تمام شده");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("کالا مورد نظر تغیر یافت");
  };

  const tableHeaderItems = [
    "کالا",
    "تعداد",
    "قیمت",
    "فرمان ها",
  ];

  return (
    <Layout title="سبد خرید">
      <div
        className="mt-14 mx-auto max-w-screen-md bg-stone-900 text-stone-200 p-10 rounded-xl"
        dir="rtl"
      >
        <h1 className="my-4 text-4xl text-center">سبد خرید</h1>
        {cartItems.length === 0 ? (
          <div>
            سبد خرید شما خالی است.&nbsp;{" "}
            <Link href="/products">
              <a className="text-green-500 hover:underline">الان خرید کن</a>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5 mt-5" dir="ltr">
            <Table cols={4} headerItems={tableHeaderItems}>
              {cartItems.map((item, index) => (
                <TableRow key={index} cols={4}>
                  <RowField className="col-span-2 flex items-center">
                    <Link href={`/products/${item.slug}`}>
                      <a className="flex items-center gap-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </a>
                    </Link>
                  </RowField>
                  <RowField className="p-5">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateCartHandler(item, e.target.value)}
                      className='bg-stone-700 rounded-sm w-full p-1'
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </RowField>
                  <RowField className="p-5 flex items-center">${item.price}</RowField>
                  <RowField className="p-5 flex items-center">
                    <button onClick={() => removeItemHandler(item)}>
                      <AiOutlineCloseCircle className="text-2xl text-red-500 hover:text-red-600"></AiOutlineCloseCircle>
                    </button>
                  </RowField>
                </TableRow>
              ))}
            </Table>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl text-center">
                    مجموع <p className="text-green-400 inline">{cartItems.reduce((a, c) => a + c.quantity, 0)} </p>کالا شما: &nbsp;
                    <p className="text-green-400 inline mx-1">{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} </p>تومان 
                  </div>
                </li>
                <li>
                  <div className="mt-5">
                  <PrimaryButton handleClick={() => router.push("login?redirect=/shipping")} text="پرداخت" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
