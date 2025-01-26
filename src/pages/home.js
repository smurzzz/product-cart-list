import React from "react";
import { productList } from "../data";
import ProductCart from "../components/productCart";

const Home = () => {
  return (
    <div className="mt-5">
      <h1 className="text-Rose900 text-3xl tracking-wider font-[700]">
        Dessert
      </h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-5 sm:grid-cols-2 w-full">
        {productList.map((item, key) => (
          <ProductCart key={key} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
