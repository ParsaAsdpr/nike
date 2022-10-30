import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import AdminLayout from "../../components/AdminLayout";
import SecondaryButton from "../../components/common/SecondaryButton";
import RowField from "../../components/common/Table/RowField";
import Table from "../../components/common/Table/Table";
import TableRow from "../../components/common/Table/TableRow";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const tableHeaderItems = [
    "کاربر",
    "تاریخ",
    "مجموع",
    "وضعیت پرداخت",
    "وضعیت ارسال",
    "فرمان ها",
  ];

  return (
    <Layout title="لیست سفارش ها">
      <AdminLayout
        activeIndex={1}
        error={error}
        loading={loading}
        title="لیست سفارش ها"
      >
        <Table headerItems={tableHeaderItems} cols={6}>
          {orders.map((order, index) => (
            <TableRow key={index} cols={6}>
              <RowField>
                {order.user ? order.user.name : "حساب حذف شده"}
              </RowField>
              <RowField>{order.createdAt.substring(0, 10)}</RowField>
              <RowField>${order.totalPrice}</RowField>
              <RowField>
                {order.isPaid
                  ? `${order.paidAt.substring(0, 10)}`
                  : "پرداخت نشده"}
              </RowField>
              <RowField>
                {order.isDelivered
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : "ارسال نشده"}
              </RowField>
              <RowField>
                <SecondaryButton
                  text={"جزییات"}
                  sm
                  handleClick={() => router.push(`/order/${order._id}`)}
                />
              </RowField>
            </TableRow>
          ))}
        </Table>
      </AdminLayout>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
