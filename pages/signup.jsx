import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

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
    <Layout title="ثبت نام">
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 mt-10 p-10 rounded-xl text-slate-200"
        onSubmit={handleSubmit(submitHandler)}
        dir="rtl"
      >
        <h1 className="mb-10 mt-5 text-4xl font-bold text-center">ثبت نام</h1>
        <TextBox
          className="mb-4"
          type={"text"}
          validation={register("name", {
            required: "لطفا نام خود را وارد کنید",
          })}
          error={errors.name}
          id={"name"}
          text={"نام"}
        />
        <TextBox
          className="mb-4"
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
          className="mb-4"
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
        <div>
          <TextBox
            className="mb-4"
            type={"password"}
            validation={register("confirmPassword", {
              required: "لطفا گذرواژه را وارد کنید.",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "گذرواژه باید بیش از ۶ حرف داشته باشد",
              },
            })}
            error={errors.confirmPassword}
            id={"confirmPassword"}
            text={"تکرار گذرواژه"}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 -mt-8 text-xs pt-3 ">
                گذرواژه ها مطابقت ندارند.
              </div>
            )}
        </div>
        <div className="mb-8 mt-8">
          <PrimaryButton text="ورود" />
        </div>
        <div className="mb-3 px-3">
          از قبل حساب دارید؟ &nbsp;
          <Link href={`/login`}>
            <a className="text-green-500 hover:underline">ورود</a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
