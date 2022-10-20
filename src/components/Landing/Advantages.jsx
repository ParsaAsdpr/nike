import React from "react";
import guaranty from "../../../public/images/Group 14.svg"
import worldwide from "../../../public/images/Group 18.svg"
import delivery from "../../../public/images/Group 8.svg"
import services from "../../../public/images/Group 17.svg"

const Advantages = () => {
  let [advantages] = React.useState([
    { text: "گارانتی تعویض", image: guaranty },
    { text: "ارسال به سرار جهان", image: worldwide },
    { text: "تحویل سریع", image: delivery },
    { text: "خدمات پس از فروش", image: services },
  ]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 py-14 px-20">
        {advantages.map((advantage, index) => (
            <div className="flex flex-col justify-center items-center" key={index}>
                <img src={advantage.image} alt={advantage.text} className="w-1/2" />
                <p className="text-xl text-white opacity-50 pt-5">{advantage.text}</p>
            </div>
        ))}
    </div>
  )
};

export default Advantages;
