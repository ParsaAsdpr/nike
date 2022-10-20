import React from "react";
import PrimaryButton from "../common/PraimaryButton";
import PN from "persian-number";
import shoe from "../../Assets/Images/some good shoe.png";

const Header = () => {
  return (
    <div className="w-full h-screen bg-stone-900">
      <div className="h-full max-w-7xl mx-auto overflow-hidden flex flex-row justify-between">
        {/* RIGHT SIDE OF HEADER */}
        <div className="w-1/2 flex flex-col justify-center items-center px-20 lg:px-10 xl:px-0">
          <h1 className="text-7xl text-white text-right w-full leading-relaxed">
            محصول جدید نایکی Nike Air Max
          </h1>
          <p className="text-lg text-white opacity-40 pl-28 leading-10 mt-7">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع
          </p>

          <div className="flex flex-row justify-between mt-12 w-full">
            <div className="w-1/2">
              <PrimaryButton url="#" text="مشاهده محصول" />
            </div>
            <div className="w-1/3 text-white text-2xl opacity-70 ml-24">
              <p>{PN.convertEnToPe(PN.sliceNumber("3250000"))} تومان </p>
            </div>
          </div>
        </div>
        {/* LEFT SIDE OF HEADER */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <img src={shoe} alt="shoe" className="w-2/3 rotate-12 shoe"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
