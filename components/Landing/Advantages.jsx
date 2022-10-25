import Image from "next/future/image";
import React from "react";


const Advantages = () => {
  let advantages = [
    { text: "گارانتی تعویض", image: '/Images/Group 14.svg' },
    { text: "ارسال به سرار جهان", image: '/Images/Group 18.svg' },
    { text: "تحویل سریع", image: '/Images/Group 8.svg' },
    { text: "خدمات پس از فروش", image: '/Images/Group 17.svg' },
  ]

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 py-14 px-20">
        {advantages.map((advantage, index) => (
            <div className="flex flex-col justify-center items-center" key={index}>
                <Image src={advantage.image} alt={advantage.text} width={150} height={150} />
                <p className="text-xl text-white opacity-50 pt-5">{advantage.text}</p>
            </div>
        ))}
    </div>
  )
};

export default Advantages;
