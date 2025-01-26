import React, { useEffect } from "react";
import { productList } from "../data";
import removeItem from "../assets/images/icon-remove-item.svg";
import { removeProduct, setProductDetails } from "../stores/cart";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = (props) => {
  const { productId, quantity } = props.data;
  const dispatch = useDispatch();

  // Access product details from Redux state
  const details = useSelector((state) => state.cart.productDetails[productId]);

  useEffect(() => {
    const findDetail = productList.find((product) => product.id === productId);
    if (findDetail) {
      dispatch(setProductDetails({ productId, details: findDetail }));
    }
  }, [productId, dispatch]);

  const price = details?.price || 0;
  const totalPrice = price * quantity;

  const handleRemove = () => {
    dispatch(removeProduct({ productId }));
  };

  return (
    <div className="my-8 flex justify-between border-b-2 pb-5 items-center w-full px-3">
      <div>
        <p className="mb-2 text-Rose900 font-[600] text-[18px]">
          {details?.name}
        </p>
        <div className="flex gap-3">
          <p className="text-Red font-[600]">{quantity}x</p>
          <p className="font-[500] text-Rose500">
            <span className="mr-1">@</span>${price.toFixed(2)}
          </p>
          <p className="font-[600] text-Rose500">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div
        className="p-1 rounded-full border border-Rose400"
        onClick={handleRemove}
      >
        <img src={removeItem} alt="Remove item" />
      </div>
    </div>
  );
};

export default ProductItem;
