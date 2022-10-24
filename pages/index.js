import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Title from "../components/common/Title";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import responsive from "../utils/carouselResponsive";
import { CustomLeftArrow, CustomRightArrow } from "../utils/carouselButtons";
import Advantages from "../components/Advantages";
import OfferBanner from "../components/OfferBanner";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };

  return (
    <Layout title="Home Page">
      <Hero />
      <section className="relative z-0 mt-10" dir="rtl">
        <div className="curve absolute"></div>
        <Title text="تخفیف های پاییزی"></Title>

        <div className="bg-stone-900 py-5 w-full min-w-full mt-5">
          <div className="max-w-7xl mx-auto overflow-hidden px-3 md:px-10">
            <Carousel
              responsive={responsive}
              swipeable={true}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
              className="pb-0 md:pb-20"
              infinite={false}
            >
              {products.map((product) => (
                <ProductItem
                  product={product}
                  key={product.slug}
                  addToCartHandler={addToCartHandler}
                  isProduct={true}
                ></ProductItem>
              ))}
            </Carousel>
          </div>
        </div>

        <Advantages />

        <OfferBanner />
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
