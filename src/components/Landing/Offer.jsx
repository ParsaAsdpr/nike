import React from "react";
import pic from "../../Assets/Images/model.jpeg";
import {BsArrowLeft} from 'react-icons/bs'

const Offer = () => {
  return (
    <div className="w-full bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto">
      <div className="h-[330px] w-full overflow-hidden flex flex-row items-center">
        <img src={pic} alt="" className="h-full scale-110" />
        <div className="px-32">
            <h1 className="text-3xl text-stone-700 leading-[1.270]">تخفیف باور نکردنی لباس های اسپورت</h1>
            <p className="text-stone-500 text-md leading-relaxed mt-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون 
                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع </p>
                <a href="# " className="flex flex-row gap-3 items-center text-lg mt-3 text-900 hover:animate-bounce transition">مشاهده محصولات <BsArrowLeft /></a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Offer;
