import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PrimaryButton from "../components/common/PraimaryButton";
import { TextBox } from "../components/common/Input";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
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
        <TextBox
          className="mb-5 mt-3"
          type={"email"}
          validation={register("email", {
            required: "لطفا ایمیل خود را وارد کنید.",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "فرمت ایمیل اشتباه است.",
            },
          })}
          error={errors.email}
          id={"email"}
          text={"ایمیل"}
        />
        <TextBox
          className="mb-8"
          type={"password"}
          validation={register("password", {
            required: "لطفا گذرواژه را وارد کنید.",
            minLength: {
              value: 6,
              message: "گذرواژه باید بیش از ۶ حرف باشد.",
            },
          })}
          error={errors.password}
          id={"password"}
          text={"گذرواژه"}
        />
        <div className="mb-8 ">
          <PrimaryButton text="ورود" />
        </div>
        <div className="mb-3 px-3">
          حسابی ندارید؟ &nbsp;
          <Link href={`/signup?redirect=${redirect || "/"}`}>
            <a className="text-green-500 hover:underline">ثبت نام کنید</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
