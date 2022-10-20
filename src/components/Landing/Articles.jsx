import React from "react";
import pic from "../../Assets/Images/Mask Group 1.png";
import Card from "../common/Card";
import Title from "../common/Title";

const Articles = () => {
  const [shoes] = React.useState([
    {
      title: "عرضه شد Nike Air Max  کفش",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و   ",
      image: pic,
    },
    {
      title: "عرضه شد Nike Air Max  کفش",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و   ",
      image: pic,
    },
    {
      title: "عرضه شد Nike Air Max  کفش",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و   ",
      image: pic,
    },
    {
      title: "عرضه شد Nike Air Max  کفش",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و   ",
      image: pic,
    },
  ]);
  return (
    <div>
      <div className="mt-10">
        <Title text="جدید ترین مقالات"></Title>

        <div className="bg-stone-900 py-10 mt-4 w-full">
          <div className="max-w-7xl mx-auto flex flex-row gap-5">
            {shoes.map((shoe, index) => (
              <Card
                title={shoe.title}
                desc={shoe.desc}
                image={shoe.image}
                key={index}
                isProduct={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
