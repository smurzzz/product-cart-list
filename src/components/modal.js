import React from "react";
import checkIcon from "../assets/images/icon-order-confirmed.svg";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, onConfirm }) => {
  const items = useSelector((state) => state.cart.items);
  const productDetails = useSelector((state) => state.cart.productDetails);

  //calculate the total price
  const totalOrder = items.reduce((acc, item) => {
    const details = productDetails[item.productId];
    return acc + (details?.price || 0) * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="p-8 drop-shadow-xl rounded-xl bg-white w-[600px] max-h-[90vh] overflow-y-auto">
        <img src={checkIcon} />
        <div className="mt-5">
          <p className="font-[700] text-4xl">Order Confirmed</p>
          <p className="mt-2 text-Rose500">We hope you enjoy your food!</p>
        </div>
        <div className="mt-5 bg-Rose100 py-5 sm:px-7 px-3 rounded-xl">
          {items.map((item) => {
            const details = productDetails[item.productId];
            const totalItemPrice = (details?.price || 0) * item.quantity;

            return (
              <div
                key={item.productId}
                className="flex items-center justify-between py-5 border-b-2 mb-3"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={details?.image.desktop}
                    className="sm:w-[60px] w-[50px] drop-shadow-xl rounded-xl"
                  />
                  <div>
                    <p className=" text-Rose900 sm:w-full max-w-[120px] font-[600]">
                      {details?.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="text-Red font-[600]">{item.quantity}x</p>
                      <p className="font-[500] text-Rose500">
                        <span className="mr-1">@</span>${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-[600] text-Rose900 text-[18px]">
                    ${totalItemPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between mt-5">
            <p className="font-[500] text-Rose900]">Order Total</p>
            <p className="font-[700] text-Rose900 text-[25px]">
              ${totalOrder.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="w-full bg-Red text-white p-5 mt-8 rounded-full font-[500] text-[18px]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
