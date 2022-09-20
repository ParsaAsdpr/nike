import React from "react";
import PN from "persian-number";
import PrimaryButton from "./PraimaryButton";
import { FiHeart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import LinkButton from "./LinkButton";

const Card = (props) => {
  let content = [];
  for (let i = 0; i < props.rating; i++) {
    content.push(1);
  }
  return (
    <div className="rounded-2xl bg-white shadow-2xl bg-opacity-5 p-6 flex flex-col justify-center">
      <div>
        <img src={props.image} alt={props.title} className="w-full rounded-lg" />
      </div>

      <h2 className={`text-white mt-4 ${ props.isProduct ? "text-lg" : "text-xl"}`}>{props.title}</h2>
      {props.isProduct ? (
        <div className="flex flex-row justify-between py-4 items-center">
          <p className="text-white text-sm">
            {PN.convertEnToPe(PN.sliceNumber(props.price))} تومان{" "}
          </p>
          <div className="text-yellow-500 flex flex-row text-sm">
            {content.map((star, index) => (
              <AiFillStar key={index} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-stone-500 text-base mt-3">{props.desc}</p>
      )}

      <div className="flex flex-row justify-between items-center py-4">
        <div>
          <div>
            {props.isProduct ? (
              <PrimaryButton url="#" text="سفارش" sm={true} />
            ) : (
              <LinkButton url="# " text="خواندن مقاله"></LinkButton>
            )}
          </div>
        </div>
        <div className="text-white text-3xl hover:scale-110 cursor-pointer transition">
          {props.isProduct ? <FiHeart></FiHeart> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Card;
