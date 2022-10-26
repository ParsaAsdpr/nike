import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import PN from 'persian-number'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="تاریخه خرید ها">
      <div className='mx-auto max-w-7xl bg-stone-900 mt-10 p-10 rounded-xl text-slate-200' dir='rtl'>
      <h1 className="mb-10 mt-5 text-4xl font-bold text-center">تاریخچه خرید ها</h1>
      {loading ? (
        <div className='text-center py-20 text-4xl text-white'>در حال بارگذاری...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-full">
              <ul className='w-full grid grid-cols-6 border-b text-green-500 border-b-green-500'>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">شناسه</li>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">تاریخ</li>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">مجموع</li>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">وضعیت پرداخت</li>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">وضعیت ارسال</li>
                <li className="p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden text-right">فرمان ها</li>
              </ul>
              {orders.map((order) => (
                <ul key={order._id} className="w-full grid grid-cols-6 border-b text-stone-300 border-b-stone-300">
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">{order._id.substring(20, 24)}</li>
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">{order.createdAt.substring(0, 10)}</li>
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">{PN.convertEnToPe(PN.sliceNumber(order.totalPrice))} تومان{" "}</li>
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'پرداخت نشده'}
                  </li>
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'دریافت نشده'}
                  </li>
                  <li className=" p-5 text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">
                    <Link href={`/order/${order._id}`} passHref>
                      <a>جزییات</a>
                    </Link>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
