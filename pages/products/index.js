import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Title from "../../components/common/Title";
import Layout from "../../components/Layout";
import ProductItem from "../../components/ProductItem";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function Products({ products }) {
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
    <Layout title="محصولات">
      <section className="my-8 max-w-7xl mx-auto" dir="rtl">
        <Title text="محصولات" />
        <div className="grid grid-cols-4 gap-y-7 gap-5 mt-10">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
              isProduct={true}
            ></ProductItem>
          ))}
        </div>
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
