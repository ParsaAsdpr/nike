import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import PrimaryButton from '../components/common/PraimaryButton';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="ثبت نام">
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 mt-10 p-10 rounded-xl text-slate-200"
        onSubmit={handleSubmit(submitHandler)}
        dir='rtl'
      >
        <h1 className="mb-10 mt-5 text-4xl font-bold text-center">ثبت نام</h1>
        <div className="mb-4">
          <label htmlFor="name">نام</label>
          <input
            type="text"
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.name && 'border-red-500'}`}
            id="name"
            autoFocus
            {...register('name', {
              required: 'لطفا نام خود را وارد کنید',
            })}
          />
          {errors.name && (
            <div className="text-red-500 text-xs pt-3">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            {...register('email', {
              required: 'لطفا ایمیل خود را وارد کنید.',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'فرمت ایمیل اشتباه است.',
              },
            })}
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.email && 'border-red-500'}`}
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500 text-xs pt-3">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">گذرواژه</label>
          <input
            type="password"
            {...register('password', {
              required: 'لطفا گذرواژه را وارد کنید.',
              minLength: { value: 6, message: 'گذرواژه باید بیش از ۶ حرف باشد.' },
            })}
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.password && 'border-red-500'}`}
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 text-xs pt-3">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">تکرار گذرواژه</label>
          <input
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.confirmPassword && 'border-red-500'}`}
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'لطفا گذرواژه را وارد کنید.',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'گذرواژه باید بیش از ۶ حرف داشته باشد',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-xs pt-3 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 text-xs pt-3 ">گذرواژه ها مطابقت ندارند.</div>
            )}
        </div>

        <div className="mb-8 mt-8">
          <PrimaryButton text='ورود' />
        </div>
        <div className="mb-3 px-3">
          حسابی ندارید؟ &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}><a className='text-green-500 hover:underline'>ثبت نام</a></Link>
        </div>
      </form>
    </Layout>
  );
}
