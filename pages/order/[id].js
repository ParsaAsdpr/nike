import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import PN from "persian-number";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function OrderScreen() {
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`سفارش ${orderId}`}>
      <div className="mx-auto max-w-7xl mt-5" dir="rtl">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="bg-stone-900 rounded-xl p-10 text-stone-200">
            <h1 className="mb-4 text-2xl font-bold flex flex-row gap-1">
              سفارش <p className="font-sans">{orderId}</p>
            </h1>
            <div className="">
              <h2 className="mt-8 text-lg">سفارش ها</h2>
              <div className="min-w-full mt-3">
                <ul className="border-b border-b-stone-200 grid grid-cols-4 pb-4 font-bold items-center">
                  <li className="">کالا</li>
                  <li className="">تعداد</li>
                  <li className="">قیمت</li>
                  <li className="">مجموع قیمت</li>
                </ul>
                {orderItems.map((item) => (
                  <ul
                    key={item._id}
                    className="border-b border-b-stone-200 grid grid-cols-4 py-4 font-bold items-center"
                  >
                    <li>
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
                    </li>
                    <li className="text-right">{item.quantity}</li>
                    <li className="text-right">
                      {PN.convertEnToPe(PN.sliceNumber(item.price))} تومان{" "}
                    </li>
                    <li className="text-right">
                      {PN.convertEnToPe(
                        PN.sliceNumber(item.quantity * item.price)
                      )}{" "}
                      تومان{" "}
                    </li>
                  </ul>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-semibold text-stone-300 mt-8">
                آدرس انتقال
              </h2>
              <div className="text-stone-400">
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">ارسال شده در {deliveredAt}</div>
              ) : (
                <div className="alert-error">ارسال نشده</div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">پرداشت شده در {paidAt}</div>
              ) : (
                <div className="alert-error">پرداخت نشده</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
