import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import PrimaryButton from '../components/common/PraimaryButton';
import DangerButton from '../components/common/DangerButton';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const [isClicked, setIsClicked] = useState()

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('نحوه پرداخت را انتخاب کنید.');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/order-product');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  const handleRadioClick = (payment, index) => {
    setSelectedPaymentMethod(payment)
    setIsClicked(index)
  }

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-sm bg-stone-900 mt-10 p-10 rounded-xl text-stone-200" dir='rtl' onSubmit={submitHandler}>
        <h1 className="mb-10 mt-5 text-4xl font-bold text-center">نحوه پرداخت</h1>
        {['درگاه بانکی', 'پرداخت درب منزل'].map((payment, index) => (
          <div key={payment} className="mb-4 py-4 px-7 border border-stone-800 bg-[#131313] text-xl rounded-md flex flex-row items-center gap-1">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0 hidden"
              id={`option${index}`}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => handleRadioClick(payment, index)}
            />
            <label className="w-7 p-1.5 h-7 border border-stone-800 bg-stone-900 rounded-full cursor-pointer" htmlFor={`option${index}`}>
              <div className={`w-full h-full bg-green-500 rounded-full transition ${isClicked == index ? 'scale-100' : 'scale-0'}`}></div>
            </label>
            &nbsp;
            <label className={`p-2 cursor-pointer transition ${isClicked == index ? 'text-green-500' : 'text-stone-200'}`} htmlFor={`option${index}`}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 mt-10 grid grid-cols-2 gap-5">
          <PrimaryButton text='مرحله بعد' />
          <DangerButton text='مرحله قبل' handleClick={() => router.push('/shipping')} />
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
