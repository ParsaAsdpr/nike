import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import axios from "axios";
import Layout from "../components/Layout";
import PrimaryButton from "../components/common/PraimaryButton";
import { TextBox } from "../components/common/Input";

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("پروفایل شما با موفقیت ویرایش شد.");
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="ویرایش پروفایل">
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 mt-10 p-10 rounded-xl text-slate-200"
        onSubmit={handleSubmit(submitHandler)}
        dir="rtl"
      >
        <h1 className="mb-10 mt-5 text-4xl font-bold text-center">
          ویرایش پروفایل
        </h1>
        <TextBox
          className="mb-4"
          type={"text"}
          validation={register("name", {
            required: "لطفا نام خود را وارد کنید",
          })}
          error={errors.country}
          id={"name"}
          text={"نام"}
        />
        <TextBox
          className="mb-4"
          type={"email"}
          validation={register("email", {
            required: "لطفا ایمیل خود را وارد کنید",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "فرمت ایمیل اشتباه است",
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
            minLength: {
              value: 6,
              message: "گذرواژه باید بیش از ۶ حرف داشته باشد",
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
              <div className="text-red-500 text-xs pt-3 ">
                گذرواژه ها مطابقت ندارند
              </div>
            )}
        </div>
        <div className="mb-8 mt-8">
          <PrimaryButton text="ویرایش" />
        </div>
      </form>
    </Layout>
  );
}

ProfileScreen.auth = true;
