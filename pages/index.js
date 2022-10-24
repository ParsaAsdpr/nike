import Hero from "../components/Landing/Hero";
import Layout from "../components/Layout";
import "react-multi-carousel/lib/styles.css";
import Advantages from "../components/Landing/Advantages";
import OfferBanner from "../components/Landing/OfferBanner";
import BestSelling from "../components/Landing/BestSelling";
import db from "../utils/db";
import Product from "../models/Product";
import LatestProduct from "../components/Landing/LatestProduct";

export default function Home({products}) {
  return (
    <Layout title="Home Page">
      <Hero />
      <section className="relative z-0 mt-10" dir="rtl">
        <div className="curve absolute"></div>
        <BestSelling products={products} title='تخفیف های پاییزی' />
        <Advantages />
        <OfferBanner />
        <div className="mt-10">
        <BestSelling products={products} title='پرفروش ترین محصولات' />
        </div>
        <LatestProduct />
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
