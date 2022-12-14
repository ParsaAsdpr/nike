import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import PN from "persian-number";
import SecondaryButton from "../components/common/SecondaryButton";
import PrimaryButton from "../components/common/PraimaryButton";
import Table from "../components/common/Table/Table";
import TableRow from "../components/common/Table/TableRow";
import RowField from "../components/common/Table/RowField";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(data);
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/history`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  const tableHeaderItems = ["????????", "??????????", "????????", "???????? ??????????"];

  return (
    <Layout title="?????????? ????????">
      <CheckoutWizard activeStep={3} />
      <div className="mx-auto max-w-7xl" dir="rtl">
        {cartItems.length === 0 ? (
          <div>
            ?????? ???????? ?????? ???????? ??????.&nbsp;{" "}
            <Link href="/products">
              <a className="text-green-500 hover:underline">???????? ???????? ????</a>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 md:gap-5">
            <div className="overflow-x-auto md:col-span-2 bg-stone-900 rounded-xl p-10 text-stone-200">
              <h1 className="mb-4 text-2xl font-bold ">?????????? ????????</h1>
              <div className="overflow-x-auto p-1 mt-5">
                <h2 className="mt-5 text-lg">?????????? ????</h2>
                <Table headerItems={tableHeaderItems} cols={4}>
                  {cartItems.map((item, index) => (
                    <TableRow key={index} cols={4}>
                      <RowField>
                        <Link href={`/products/${item.slug}`}>
                          <a className="flex items-center gap-3">
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
                      <RowField className="">{item.quantity}</RowField>
                      <RowField className="">
                        {PN.convertEnToPe(PN.sliceNumber(item.price))} ??????????{" "}
                      </RowField>
                      <RowField className="">
                        {PN.convertEnToPe(
                          PN.sliceNumber(item.quantity * item.price)
                        )}{" "}
                        ??????????{" "}
                      </RowField>
                    </TableRow>
                  ))}
                </Table>
                <div className="mt-5">
                  <SecondaryButton
                    text="????????????"
                    handleClick={() => router.push("/cart")}
                  />
                </div>
                <div className="mt-7">
                  <h2 className="mb-2 text-xl font-semibold text-stone-300">
                    ???????? ????????????
                  </h2>
                  <div className="text-stone-400">
                    {shippingAddress.fullName}, {shippingAddress.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </div>
                  <div className="mt-5">
                    <SecondaryButton
                      text="????????????"
                      handleClick={() => router.push("/shipping")}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="mb-2 text-lg">???????? ????????????</h2>
                  <div>{paymentMethod}</div>
                  <div className="mt-5">
                    <SecondaryButton
                      text="????????????"
                      handleClick={() => router.push("/payment")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-stone-900 rounded-xl p-10">
                <h2 className="mb-2 text-2xl text-stone-200">?????????? ?????????? ????</h2>
                <ul className="text-lg mt-5 text-stone-300">
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div> ???????? ????</div>
                      <div className="text-stone-400">
                        {PN.convertEnToPe(PN.sliceNumber(itemsPrice))} ??????????{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>????????????</div>
                      <div className="text-stone-400">
                        {PN.convertEnToPe(PN.sliceNumber(taxPrice))} ??????????{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>?????? ?? ??????</div>
                      <div className="text-stone-400">
                        {PN.convertEnToPe(PN.sliceNumber(shippingPrice))} ??????????{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>??????????</div>
                      <div className="text-stone-400">
                        {PN.convertEnToPe(PN.sliceNumber(totalPrice))} ??????????{" "}
                      </div>
                    </div>
                  </li>
                  <li className="mt-6">
                    <PrimaryButton
                      text={loading ? "?????????? ????????????????..." : "?????????? ????????"}
                      handleClick={placeOrderHandler}
                      disabled={loading}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
