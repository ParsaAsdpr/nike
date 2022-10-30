import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import PN from "persian-number";
import PrimaryButton from "../../components/common/PraimaryButton";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="محصول مورد نظر پیدا نشد">محصول مورد نظر پیدا نشد</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("متاسفیم، کالا مورد نظر تمام شده است");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  let content = [];
  for (let i = 0; i < product.rating; i++) {
    content.push(1);
  }

  return (
    <Layout title={product.name}>
      <div
        className="grid md:grid-cols-2 mt-5 md:gap-10 max-w-7xl mx-auto bg-stone-900 p-10 rounded-xl"
        dir="rtl"
      >
        <div className="">
          <div className="bg-white bg-opacity-5 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={90}
              layout="responsive"
            ></Image>
          </div>
        </div>
        <div className="">
          <ul>
            <li>
              <h1 className="text-4xl text-slate-100 py-6 font-bold">
                کفش {product.brand} {product.name}
              </h1>
            </li>
            <li className="text-base font-thin leading-loose pb-7 text-stone-400">
              {product.description}
            </li>
            <ul className="flex flex-row justify-around">
              <li className="text-yellow-500 flex flex-row text-2xl">
                {content.map((star, index) => (
                  <AiFillStar key={index} />
                ))}
              </li>
              <li className="text-3xl text-stone-400">
                {PN.convertEnToPe(PN.sliceNumber(product.price))} تومان{" "}
              </li>
            </ul>
            <li className="w-full px-3 my-8">
              <PrimaryButton text="سفارش" handleClick={addToCartHandler} />
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5"></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
