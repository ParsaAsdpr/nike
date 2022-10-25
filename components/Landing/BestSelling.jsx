import React, {useContext} from "react";
import { Store } from "../../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import responsive from "../../utils/carouselResponsive";
import { CustomLeftArrow, CustomRightArrow } from "../../utils/carouselButtons";
import Carousel from "react-multi-carousel";
import ProductItem from "../ProductItem";
import Title from "../common/Title.jsx";

const BestSelling = ({ products, title }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("متاسفم، کالا مورد نظر شما تمام شده است.");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("کالا به سبد خرید شما اضافه شد");
  };

  return (
    <>
      <Title text={title}></Title>

      <div className="bg-stone-900 py-5 w-full min-w-full mt-5">
        <div className="max-w-7xl mx-auto overflow-hidden px-3 md:px-10">
          <Carousel
            responsive={responsive}
            swipeable={true}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            infinite={false}
          >
            {products.map((product) => (
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
                isProduct={true}
                inSlider
              ></ProductItem>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default BestSelling;
