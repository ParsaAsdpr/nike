import React from "react";
import PrimaryButton from "../common/PraimaryButton";
import PN from "persian-number";
import Image from "next/future/image";

const Hero = () => {
  return (
    <section className="w-full bg-stone-900" dir="rtl">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse justify-between py-28 md:pt-28 xl:pt-0">
        <div className="py-44 overflow-hidden flex flex-row justify-between w-full md:w-1/2">
          <div className=" flex flex-col justify-center items-center px-10 sm:px-5 lg:px-10">
            <h1 className="xl:text-7xl text-white text-right w-full xl:leading-relaxed md:leading-relaxed leading-relaxed lg:text-5xl sm:text-4xl text-3xl">
              محصول جدید نایکی Nike Air Max
            </h1>
            <p className="lg:text-lg md:text-base text-sm text-white opacity-40 lg:pl-28 md:leading-loose leading-loose lg:leading-10 mt-7">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع
            </p>

            <div className="flex flex-row justify-between mt-12 w-full lg:gap-0 gap-8">
              <div className="lg:w-1/3 md:w-1/2 sm:w-1/2 w-2/3">
                <PrimaryButton url="#" text="مشاهده محصول" className={'sm:text-base lg:text-lg text-sm'} />
              </div>
              <div className="w-1/2 text-white lg:text-xl xl:text-2xl sm:text-base text-base opacity-70 lg:ml-24 flex flex-row items-center">
                <p>{PN.convertEnToPe(PN.sliceNumber("3250000"))} تومان </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-1/3 hidden md:flex flex-col items-center justify-center pl-5">
          <Image
            src="/images/some good shoe.png"
            alt="shoe"
            className="rotate-12 shoe overflow-visible"
            width={400}
            height={400}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
