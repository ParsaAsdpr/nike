import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import PN from "persian-number";
import Table from "../../components/common/Table/Table";
import RowField from "../../components/common/Table/RowField";
import TableRow from "../../components/common/Table/TableRow";

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

  const tableHeaderItems = ["کالا", "تعداد", "قیمت", "مجموع قیمت"];
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
              <h2 className="mt-8  mb-4 text-lg">سفارش ها</h2>
              <Table headerItems={tableHeaderItems} cols={4}>
                {orderItems.map((item, index) => (
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
                    <RowField>{item.quantity}</RowField>
                    <RowField>
                      {PN.convertEnToPe(PN.sliceNumber(item.price))} تومان{" "}
                    </RowField>
                    <RowField>
                      {PN.convertEnToPe(
                        PN.sliceNumber(item.quantity * item.price)
                      )}{" "}
                      تومان{" "}
                    </RowField>
                  </TableRow>
                ))}
              </Table>
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
