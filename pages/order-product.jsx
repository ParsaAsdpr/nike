import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import PN from 'persian-number';
import SecondaryButton from '../components/common/SecondaryButton';
import PrimaryButton from '../components/common/PraimaryButton';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(data)
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
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

  return (
    <Layout title="سفارش کالا">
      <CheckoutWizard activeStep={3} />
      <div className='mx-auto max-w-7xl' dir='rtl'>
      {cartItems.length === 0 ? (
        <div>
        سبد خرید شما خالی است.&nbsp;{" "}
        <Link href="/products">
          <a className="text-green-500 hover:underline">الان خرید کن</a>
        </Link>
      </div>
      ) : (
        <div className="grid md:grid-cols-3 md:gap-5">
          <div className="overflow-x-auto md:col-span-2 bg-stone-900 rounded-xl p-10 text-stone-200">
          <h1 className="mb-4 text-2xl font-bold ">سفارش کالا</h1>
            <div className="overflow-x-auto p-1 mt-5">
              <h2 className="mt-5 text-lg">سفارش ها</h2>
              <div className="min-w-full">
                  <ul className='border-b border-b-stone-200 grid grid-cols-4 py-4 font-bold items-center'>
                    <li className="">کالا</li>
                    <li className="">تعداد</li>
                    <li className="">قیمت</li>
                    <li className="">مجموع قیمت</li>
                  </ul>
                  {cartItems.map((item) => (
                    <ul key={item._id} className="border-b border-b-stone-200 grid grid-cols-4 py-4 font-bold items-center">
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
                      <li className="">{item.quantity}</li>
                      <li className="">{PN.convertEnToPe(PN.sliceNumber(item.price))} تومان{" "}</li>
                      <li className="">
                        {PN.convertEnToPe(PN.sliceNumber(item.quantity * item.price))} تومان{" "}
                      </li>
                    </ul>
                  ))}
              </div>
              <div className='mt-5'>
                <SecondaryButton text='ویرایش' handleClick={() => router.push('/cart')} />
              </div>
            <div className="mt-7">
              <h2 className="mb-2 text-xl font-semibold text-stone-300">آدرس انتقال</h2>
              <div className='text-stone-400'>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div className='mt-5'>
                <SecondaryButton text='ویرایش' handleClick={() => router.push('/shipping')} />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="mb-2 text-lg">نحوه پرداخت</h2>
              <div>{paymentMethod}</div>
              <div className='mt-5'>
              <SecondaryButton text='ویرایش' handleClick={() => router.push('/payment')} />
              </div>
            </div>


            </div>
          </div>


          <div>
            <div className="bg-stone-900 rounded-xl p-10">
              <h2 className="mb-2 text-2xl text-stone-200">خلاصه هزینه ها</h2>
              <ul className='text-lg mt-5 text-stone-300'>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div> کالا ها</div>
                    <div className='text-stone-400'>{PN.convertEnToPe(PN.sliceNumber(itemsPrice))} تومان{" "}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>مالیات</div>
                    <div className='text-stone-400'>{PN.convertEnToPe(PN.sliceNumber(taxPrice))} تومان{" "}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>حمل و نقل</div>
                    <div className='text-stone-400'>{PN.convertEnToPe(PN.sliceNumber(shippingPrice))} تومان{" "}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>مجموع</div>
                    <div className='text-stone-400'>{PN.convertEnToPe(PN.sliceNumber(totalPrice))} تومان{" "}</div>
                  </div>
                </li>
                <li className='mt-6'>
                  <PrimaryButton text={loading ? 'درحال بارگذاری...' : 'سفارش کالا'} handleClick={placeOrderHandler} disabled={loading} />
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
