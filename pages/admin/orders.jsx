import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
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
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="">
                  <ul className='grid grid-cols-6 w-full border-b border-b-stone-100 pb-4'>
                    <li className="">کاربر</li>
                    <li className="">تاریخ</li>
                    <li className="">مجموع</li>
                    <li className="">وضعیت پرداخت</li>
                    <li className="">وضعیت ارسال</li>
                    <li className="">فرمان ها</li>
                  </ul>
                  {orders.map((order) => (
                    <ul key={order._id} className="grid grid-cols-6 w-full border-b border-b-stone-100 py-6 items-center">
                      <li className="">
                        {order.user ? order.user.name : 'DELETED USER'}
                      </li>
                      <li className="">
                        {order.createdAt.substring(0, 10)}
                      </li>
                      <li className="">${order.totalPrice}</li>
                      <li className="">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </li>
                      <li className="">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </li>
                      <li className="">
                        <Link href={`/order/${order._id}`} passHref>
                          <a>Details</a>
                        </Link>
                      </li>
                    </ul>
                  ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
