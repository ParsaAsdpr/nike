import React from "react";
import PrimaryButton from "../common/PraimaryButton";
import PN from "persian-number";
import Image from "next/future/image";

const Hero = () => {
  return (
    <section className="w-full bg-stone-900" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-row justify-between">
        <div className="py-44 overflow-hidden flex flex-row justify-between w-1/2">
          <div className=" flex flex-col justify-center items-center px-20 lg:px-10 xl:px-0">
            <h1 className="text-7xl text-white text-right w-full leading-relaxed">
              محصول جدید نایکی Nike Air Max
            </h1>
            <p className="text-lg text-white opacity-40 pl-28 leading-10 mt-7">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع
            </p>

            <div className="flex flex-row justify-between mt-12 w-full">
              <div className="w-1/3">
                <PrimaryButton url="#" text="مشاهده محصول" />
              </div>
              <div className="w-1/3 text-white text-2xl opacity-70 ml-24 flex flex-row items-center">
                <p>{PN.convertEnToPe(PN.sliceNumber("3250000"))} تومان </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center">
            <Image
              src="/Images/some good shoe.png"
              alt="shoe"
              className="rotate-12 shoe overflow-visible"
              width={500}
              height={500}
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
