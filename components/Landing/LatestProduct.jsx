import Image from "next/future/image";
import React from "react";
import LinkButton from "../common/LinkButton";
import PrimaryButton from "../common/PraimaryButton";
import Title from "../common/Title";

const LatestProduct = () => {
  return (
    <div className="mt-10 relative z-0">
      <Title text="جدید ترین محصول"></Title>
      <div className="max-w-7xl mx-auto flex flex-row py-6 lg:py-8">
        <div className="w-full md:w-2/3 flex flex-col px-5 md:px-10 xl:py-10">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white md:py-12 pb-10 md:leading-relaxed leading-relaxed" dir="rtl">
            محصول جدید Nike Airforce 1
          </h1>
          <p className="text-stone-500 text-xl leading-loose md:pl-28">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را{" "}
          </p>
          <div className="grid grid-cols-2 items-center mt-14 gap-10 md:gap-20">
            <div>
              <PrimaryButton text="سفارش محصول" url="# "></PrimaryButton>
            </div>
            <LinkButton text="افزودن به علاقه مندی ها" url="#" ></LinkButton>
          </div>
        </div>
        <div className="w-1/3 hidden md:block">
          <div className="h-full w-full latest-product flex flex-col items-center justify-center">
            <Image
              src="/images/idk.png"
              alt="Latest Product"
              width={350}
              height={350}
              className="rotate-[20deg]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
