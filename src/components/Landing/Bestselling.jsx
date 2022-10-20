import React from "react";
import Card from "../common/Card";
import Title from "../common/Title";
import shoe from "../../Assets/Images/shoe idk.png"

const Bestselling = () => {
  const [shoes] = React.useState([
    { title: "کفش Nike Air Max ", price: 2999000, rating: "5", image: shoe },
    { title: "کفش Nike Air Max ", price: 2999000, rating: "5", image: shoe },
    { title: "کفش Nike Air Max ", price: 2999000, rating: "5", image: shoe },
    { title: "کفش Nike Air Max ", price: 2999000, rating: "5", image: shoe },
    { title: "کفش Nike Air Max ", price: 2999000, rating: "5", image: shoe },
  ]);
  return (
    <div className="mt-10">
      <Title text="پرفروش ترین محصولات"></Title>

      <div className="bg-stone-900 py-10 mt-4 w-full">
        <div className="max-w-7xl mx-auto flex flex-row gap-5">
            {shoes.map((shoe,index) => (
                <Card title={shoe.title} price={shoe.price} rating={shoe.rating} image={shoe.image} key={index} isProduct={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Bestselling;
