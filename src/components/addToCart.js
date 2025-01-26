import React, { useEffect, useState } from "react";
import emptyItem from "../assets/images/illustration-empty-cart.svg";
import { useSelector } from "react-redux";
import ProductItem from "./productItem"; // Import ProductItem
import carbon from "../assets/images/icon-carbon-neutral.svg";

const AddToCart = ({ handleOpenModal }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const carts = useSelector((store) => store.cart.items);

  // Compute total quantity and total price
  useEffect(() => {
    let quantity = 0;
    let price = 0;
    carts.forEach((item) => {
      quantity += item.quantity;
      price += item.quantity * item.price; // Assuming each item has a 'price' property
    });
    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [carts]);

  return (
    <div className="bg-white w-full rounded-xl drop-shadow-xl px-5 py-7">
      <p className="font-[700] text-2xl text-Red">
        Your Cart (<span>{totalQuantity}</span>)
      </p>
      {totalQuantity >= 1 ? (
        carts.map((item, key) => <ProductItem key={key} data={item} />)
      ) : (
        <div className="w-full flex mt-10 items-center flex-col gap-5 justify-center">
          <img src={emptyItem} alt="Empty Cart" />
          <p className="text-Rose500 font-[600]">
            Your added items will appear here
          </p>
        </div>
      )}

      {totalQuantity >= 1 && (
        <div className="px-2">
          <div className="flex justify-between my-8 items-center items-center">
            <p className="font-[500] text-Rose900 text-[18px]">Order Total</p>
            <p className="font-[700] text-Rose900 text-[25px]">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="w-full p-5 bg-Rose50 rounded-xl flex gap-3 items-center justify-center">
            <img alt="image" src={carbon} />
            <p className="text-Rose900 font-[500]">
              This is a <span className="font-[600] ">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="w-full bg-Red text-white p-5 mt-8 rounded-full font-[500] text-[18px]"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
