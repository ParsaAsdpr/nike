import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import SecondaryButton from '../../components/common/SecondaryButton';
import RowField from '../../components/common/Table/RowField';
import Table from '../../components/common/Table/Table';
import TableRow from '../../components/common/Table/TableRow';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const navlinks = [
    { text: "داشبرد", href: "/admin/dashboard", isActive: false },
    { text: "سفارش ها", href: "/admin/orders", isActive: true },
    { text: "محصولات", href: "/admin/products", isActive: false },
    { text: "کاربران", href: "/admin/users", isActive: false  },
  ];
  const router = useRouter()

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
      <div className="grid max-w-7xl mx-auto bg-stone-800 overflow-hidden mt-5 rounded-xl text-stone-200 md:grid-cols-4 md:gap-5" dir='rtl'>
        <div className='bg-stone-900 p-3'>
        <ul className="flex flex-col gap-1">
            {navlinks.map((navlink) => (
              <li key={navlink.text}>
                <Link href={navlink.href}>
                  <a className={`font-bold text-xl text-stone-100 rounded-md flex flex-row items-center justify-center bg-white py-4 ${navlink.isActive ? 'bg-opacity-10' : 'bg-opacity-5'} hover:bg-opacity-10 transition`}>
                    {navlink.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=" md:col-span-3 p-10">
          <h1 className="mb-4 text-4xl text-stone-100 font-bold">لیست سفارش ها</h1>

          {loading ? (
            <div>در حال بارگذاری...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <Table headerItems={tableHeaderItems} cols={6}>
                  {orders.map((order, index) => (
                    <TableRow key={index} cols={6}>
                      <RowField>
                        {order.user ? order.user.name : 'DELETED USER'}
                      </RowField>
                      <RowField>
                        {order.createdAt.substring(0, 10)}
                      </RowField>
                      <RowField>${order.totalPrice}</RowField>
                      <RowField>
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </RowField>
                      <RowField>
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </RowField>
                      <RowField>
                        <SecondaryButton text={'جزییات'} sm handleClick={() => router.push(`/order/${order._id}`)} />
                      </RowField>
                    </TableRow>
                  ))}
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
