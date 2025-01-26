import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/images/icon-add-to-cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, changeQuantity, toggleProduct } from "../stores/cart";

const ProductCart = (props) => {
  const { name, price, image, slug, category, id } = props.data;
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleSizePicture = () => {
    if (window.innerWidth <= 630) {
      return image.mobile;
    } else if (window.innerWidth <= 768) {
      return image.tablet;
    } else {
      return image.desktop;
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        price: price,
      })
    );
    dispatch(
      toggleProduct({
        productId: id,
      })
    );
  };

  const cartItem = carts.find((item) => item.productId === id);

  const handleMinusQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(
        changeQuantity({
          productId: cartItem.productId,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  const handlePlusQuantity = () => {
    if (cartItem) {
      dispatch(
        changeQuantity({
          productId: cartItem.productId,
          quantity: cartItem.quantity + 1,
        })
      );
    }
  };

  const [sizeImage, setSizeImage] = useState(handleSizePicture());

  useEffect(() => {
    const resizePicture = () => {
      setSizeImage(handleSizePicture);
    };

    window.addEventListener("resize", resizePicture);

    return () => window.removeEventListener("resize", resizePicture);
  }, []);

  return (
    <div className="drop-shadow-xl">
      <div className="relative">
        <Link to={slug}>
          <img
            alt="photo"
            src={sizeImage}
            className={`rounded-xl ${
              cartItem && cartItem.isToggled
                ? "border-Red border-[3px] duration-300"
                : ""
            }`}
          />
        </Link>
        <div className="absolute bottom-[-15px] left-[50%] translate-x-[-50%] transform ">
          {cartItem ? (
            <button className="bg-Red flex justify-between items-center rounded-full w-[200px] h-[60px] px-5 text-white ">
              <div
                className="group border-2 w-8 h-8 rounded-full hover:bg-white duration-500 flex items-center justify-center"
                onClick={handleMinusQuantity}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="2"
                  fill="currentColor"
                  viewBox="0 0 10 2"
                  className="w-4 h-4 text-white group-hover:text-Red"
                >
                  <path d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </div>
              <span className="font-[500] ">{cartItem.quantity}</span>
              <div
                className="group border-2 w-8 h-8 rounded-full hover:bg-white duration-500 flex items-center justify-center"
                onClick={handlePlusQuantity}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  viewBox="0 0 10 10"
                  className="w-4 h-4 text-white group-hover:text-Red"
                >
                  <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                </svg>
              </div>
            </button>
          ) : (
            <button
              className="bg-white flex items-center justify-center gap-3 w-[200px] rounded-full h-[60px] px-5 border-Rose500 border duration-500 hover:text-Red text-Rose900 hover:border-red-500"
              onClick={handleAddToCart}
            >
              <img src={iconCart} alt="photo" />
              <p className="font-[500]">Add to cart</p>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-10 w-full gap-1 md:items-start items-center">
        <p className="text-Rose500 font-[500]">{category}</p>
        <p className="text-[18px] text-Rose900 font-[600]">{name}</p>
        <p className="text-Red font-[600]">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCart;
