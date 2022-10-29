import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import PN from "persian-number";
import Table from "../../components/common/Table/Table";
import RowField from "../../components/common/Table/RowField";
import SecondaryButton from '../../components/common/SecondaryButton';
import { useRouter } from "next/router";
import TableRow from "../../components/common/Table/TableRow";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, orders: action.payload, error: "" };
        case "FETCH_FAIL":
          return { ...state, loading: false, error: action.payload };
          default:
            return state;
          }
        }
        function OrderHistoryScreen() {
          const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
            loading: true,
            orders: [],
            error: "",
          });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  const router = useRouter()
  
  const tableHeaderItems = [
    "شناسه",
    "تاریخ",
    "مجموع",
    "وضعیت پرداخت",
    "وضعیت ارسال",
    "فرمان ها",
  ];

  return (
    <Layout title="تاریخه خرید ها">
      <div
        className="mx-auto max-w-7xl bg-stone-900 mt-10 p-10 rounded-xl text-slate-200"
        dir="rtl"
      >
        <h1 className="mb-10 mt-5 text-4xl font-bold text-center">
          تاریخچه خرید ها
        </h1>
        {loading ? (
          <div className="text-center py-20 text-4xl text-white">
            در حال بارگذاری...
          </div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
            <Table headerItems={tableHeaderItems} cols={6}>
              {orders.map((order, index) => (
                <TableRow key={index} cols={6}>
                  <RowField>{order._id.substring(20, 24)}</RowField>
                  <RowField>{order.createdAt.substring(0, 10)}</RowField>
                  <RowField>
                    {PN.convertEnToPe(PN.sliceNumber(order.totalPrice))} تومان{" "}
                  </RowField>
                  <RowField>
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "پرداخت نشده"}
                  </RowField>
                  <RowField>
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "دریافت نشده"}
                  </RowField>
                  <RowField>
                    <SecondaryButton text={'جزییات'} sm handleClick={() => router.push(`/order/${order._id}`)} />
                  </RowField>
                </TableRow>
              ))}
            </Table>
        )}
      </div>
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
