import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="ورود">
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 mt-10 p-10 rounded-xl text-stone-200"
        onSubmit={handleSubmit(submitHandler)}
        dir="rtl"
      >
        <h1 className="mb-14 mt-5 text-4xl font-bold text-center">ورود</h1>
        <div className="mb-8 mt-3">
          <label htmlFor="email" className='font-semibold text-lg'>ایمیل</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.email && 'border-red-500'}`}
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500 text-xs pt-3">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-8">
          <label htmlFor="password" className='font-semibold'>گذرواژه</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className={`w-full mt-2 rounded-sm border border-stone-700 p-3 outline-none bg-stone-800 focus:outline-blue-400 ${errors.password && 'border-red-500'}`}
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 text-xs pt-3">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-8 ">
          <PrimaryButton text='ورود' />
        </div>
        <div className="mb-3 px-3">
          حسابی ندارید؟ &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}><a className='text-green-500 hover:underline'>ثبت نام کنید</a></Link>
        </div>
      </form>
    </Layout>
  );
}
