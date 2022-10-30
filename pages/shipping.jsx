import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import PrimaryButton from "../components/common/PraimaryButton";
import { TextBox } from "../components/common/Input";

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
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
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

    router.push("/payment");
  };

  return (
    <Layout title="آدرس انتقال">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-sm bg-stone-900 my-10 p-10 rounded-xl text-stone-200"
        onSubmit={handleSubmit(submitHandler)}
        dir="rtl"
      >
        <h1 className="mb-8 mt-5 text-4xl font-bold text-center">
          آدرس انتقال
        </h1>
        <TextBox
          className="mb-5"
          type={"text"}
          validation={register("fullName", {
            required: "لطفا نام خود را وارد کنید.",
          })}
          error={errors.fullName}
          id={"fullName"}
          text={"نام کامل"}
        />
        <TextBox
          className="mb-5"
          type={"text"}
          validation={register("address", {
            required: "لطفا آدرس خود را وارد کنید.",
            minLength: { value: 3, message: "آدرس باید حداقل ۳ حرف باشد." },
          })}
          error={errors.address}
          id={"address"}
          text={"آدرس"}
        />
        <TextBox
          className="mb-5"
          type={"text"}
          validation={register("city", {
            required: "لطفا شهر را وارد کنید.",
          })}
          error={errors.city}
          id={"city"}
          text={"شهر"}
        />
        <TextBox
          className="mb-5"
          type={"text"}
          validation={register("postalCode", {
            required: "لطفا کد پستی را وارد کنید.",
          })}
          error={errors.postalCode}
          id={"postalCode"}
          text={"کد پستی"}
        />
        <TextBox
          className="mb-10"
          type={"text"}
          validation={register("country", {
            required: "لطفا کشور را وارد کنید",
          })}
          error={errors.country}
          id={"country"}
          text={"کشور"}
        />
        <div className="mb-4 flex justify-between">
          <PrimaryButton text="مرحله بعد" />
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
