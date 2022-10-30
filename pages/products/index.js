import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import Product from "../../models/Product";
import ProductItem from "../../components/ProductItem";
import { Store } from "../../utils/Store";
import axios from "axios";
import Title from "../../components/common/Title";
import FilterDropDown from "../../components/Products/FilterDropDown";

const PAGE_SIZE = 3;

const prices = [
  {
    name: "از ۰ تومان تا ۹۹۹,۹۹۹ تومان",
    value: "0-999999",
  },
  {
    name: "از ۱,۰۰۰,۰۰۰ تومان تا ۱,۹۹۹,۹۹۹ تومان",
    value: "1000000-1999999",
  },
  {
    name: "از ۲,۰۰۰,۰۰۰ تومان تا ۱۰,۰۰۰,۰۰۰ تومان",
    value: "2000000-10000000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { products, categories } = props;

  const filterSearch = ({
    category,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
    console.log(rating);
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("متاسفیم، کالا مورد نظر شما تمام شده است");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout
      title={query == "" || query == "all" ? "محصولات" : `جستجو محصول ${query}`}
    >
      <section className="my-8 max-w-7xl mx-auto" dir="rtl">
        <Title
          text={
            query == "" || query == "all" ? "محصولات" : `جستجو محصول ${query}`
          }
        />

        <div className="py-6 flex flex-row gap-6 items-center">
          <FilterDropDown
            defaultValue={category}
            changeHandler={categoryHandler}
            options={categories}
            text="دسته بندی"
          />
          <FilterDropDown
            defaultValue={rating}
            changeHandler={ratingHandler}
            options={ratings}
            text="امتیاز"
          />
          <div className="flex flex-row gap-3 items-center">
            <p className="text-stone-100 text-xl">قیمت</p>
            <select
              className="py-3 px-4 text-lg rounded-md bg-stone-900 text-stone-200 border-l-8 border-l-transparent"
              value={price}
              onChange={priceHandler}
            >
              <option value="all">همه</option>
              {prices &&
                prices.map((price, index) => (
                  <option key={index} value={price.value}>
                    {price.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <p className="text-stone-100 text-xl">دسته بندی</p>
            <select
              className="py-3 px-4 text-lg rounded-md bg-stone-900 text-stone-200 border-l-8 border-l-transparent"
              value={sort}
              onChange={sortHandler}
            >
              <option value="featured">مرتبط ترین ها</option>
              <option value="lowest">ارزان ترین ها</option>
              <option value="highest">گران ترین ها</option>
              <option value="toprated">محبوب ترین ها</option>
              <option value="newest">جدید ترین ها</option>
            </select>
          </div>
        </div>

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

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
