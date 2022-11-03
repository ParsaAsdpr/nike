import Image from "next/future/image";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const OfferBanner = () => {
  return (
    <div className="w-full bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto">
        <div className="h-[330px] w-full overflow-hidden flex flex-row items-center">
          <div className="relative h-full w-full hidden lg:block">
            <Image
              src="/images/model.jpeg"
              alt=""
              fill
              className="scale-x-125 scale-y-110"
            />
          </div>
          <div className="px-12 sm:px-32">
            <h1 className="sm:text-3xl text-2xl text-stone-700 leading-[1.270]">
              تخفیف باور نکردنی لباس های اسپورت
            </h1>
            <p className="text-stone-500 text-md leading-relaxed mt-4">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع{" "}
            </p>
            <a
              href="# "
              className="flex flex-row gap-3 items-center text-lg mt-3 text-900 hover:animate-bounce transition"
            >
              مشاهده محصولات <BsArrowLeft />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
