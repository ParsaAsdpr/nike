import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import PrimaryButton from '../components/common/PraimaryButton';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="آدرس انتقال">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 my-10 p-10 rounded-xl text-stone-200"
        onSubmit={handleSubmit(submitHandler)}
        dir='rtl'
      >
        <h1 className="mb-8 mt-5 text-4xl font-bold text-center">آدرس انتقال</h1>
        <div className="mb-5">
          <label htmlFor="fullName" className='font-semibold text-lg'>نام کامل</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.fullName && 'border-red-500'}`}
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'لطفا نام خود را وارد کنید.',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="address" className='font-semibold text-lg'>آدرس</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.address && 'border-red-500'}`}
            id="address"
            {...register('address', {
              required: 'لطفا آدرس خود را وارد کنید.',
              minLength: { value: 3, message: 'آدرس باید حداقل ۳ حرف باشد.' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="city" className='font-semibold text-lg'>شهر</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.city && 'border-red-500'}`}
            id="city"
            {...register('city', {
              required: 'لطفا شهر را وارد کنید.',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="postalCode" className='font-semibold text-lg'>کد پستی</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.postalCode && 'border-red-500'}`}
            id="postalCode"
            {...register('postalCode', {
              required: 'لطفا کد پستی را وارد کنید.',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-10">
          <label htmlFor="country" className='font-semibold text-lg'>کشور</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.country && 'border-red-500'}`}
            id="country"
            {...register('country', {
              required: 'لطفا کشور را وارد کنید',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <PrimaryButton text='مرحله بعد' />
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
