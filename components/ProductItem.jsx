/* eslint-disable @next/next/no-img-element */
import React from 'react';
import LinkButton from './common/LinkButton';
import { AiFillStar } from "react-icons/ai";
import PN from "persian-number";
import PrimaryButton from "./common/PraimaryButton";
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler, isProduct }) {
  let content = [];
  for (let i = 0; i < product.rating; i++) {
    content.push(1);
  }
  return (
    <div className="rounded-2xl bg-white shadow-2xl bg-opacity-5 p-4 lg:p-6 flex flex-col justify-center w-[300px] sm:w-[300px] md:w-[340px] lg:w-[240px] xl:w-[280px]" dir='rtl'>
    <Link passHref href={`/product/${product.slug}`}>
      <a className=' cursor-pointer'>
      <img src={product.image} alt={product.name} className="min-w-full rounded-lg" />
      </a>
    </Link>
    <Link passHref href={`/product/${product.slug}`}>
    <a className={`text-white mt-4 cursor-pointer text-right ${ isProduct ? "text-lg" : "text-xl"}`}> کفش {product.brand} {product.name}</a>
    </Link>
    {isProduct ? (
      <div className="flex flex-row justify-between py-4 items-center">
        <p className="text-white text-sm">
          {PN.convertEnToPe(PN.sliceNumber(product.price))} تومان{" "}
        </p>
        <div className="text-yellow-500 flex flex-row text-sm">
          {content.map((star, index) => (
            <AiFillStar key={index} />
          ))}
        </div>
      </div>
    ) : (
      <p className="text-stone-500 text-base mt-3">{product.desc}</p>
    )}

    <div className="flex flex-row justify-between items-center py-4">
      <div>
        <div>
          {isProduct ? (
            <PrimaryButton text="سفارش" handleClick={() => addToCartHandler(product)} sm={true} />
          ) : (
            <LinkButton url="# " text="خواندن مقاله"></LinkButton>
          )}
        </div>
      </div>
      <div className="text-white text-3xl hover:scale-110 cursor-pointer transition">
        {isProduct ? <LinkButton  url={`/product/${product.slug}`} text="جزییات محصول"></LinkButton> : null}
      </div>
    </div>
  </div>
  );
}
