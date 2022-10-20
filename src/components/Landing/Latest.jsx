import React from "react";
import LinkButton from "../common/LinkButton";
import PrimaryButton from "../common/PraimaryButton";
import Title from "../common/Title";
import pic from '../../Assets/Images/idk.png'


const LatestProduct = () => {
  return (
    <div className="mt-10 relative z-0">
      <Title text="جدید ترین محصول"></Title>
      <div className="max-w-7xl mx-auto flex flex-row py-8">
        <div className="w-2/3 flex flex-col px-10 py-10">
            <h1 className="text-6xl text-white py-12">Nike محصول جدید Air Force 1</h1>
            <p className="text-stone-500 text-xl leading-loose pl-28">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
             با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
             برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
             کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را </p>
             <div className="flex flex-row mt-14 gap-20">
                <div>
                <PrimaryButton text="سفارش محصول" url="# "></PrimaryButton>
                </div>
                <LinkButton text="افزودن به علاقه مندی ها" url="#"></LinkButton>
             </div>
        </div>
        <div className="w-1/3">
            <div className="h-full w-full latest-product flex flex-col items-center justify-center">
                <img src={pic} alt="" className="w-10/12 rotate-[20deg]"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
