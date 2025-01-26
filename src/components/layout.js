import { Outlet } from "react-router-dom";
import Header from "./header";
import AddToCart from "./addToCart";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../stores/cart";
import Modal from "../components/modal";
import { useState } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(removeAllItems());
    setIsOpen(false);
  };

  return (
    <div className="bg-Rose50">
      <main className="container relative flex flex-col lg:flex-row">
        <div className="lg:w-[55%] xl:w-[65%] w-full mb-5">
          <Header />
          <Outlet />
        </div>
        <div className="lg:w-[45%] xl:w-[35%] w-full flex items-start md:px-10 md:py-10 justify-center">
          <AddToCart handleOpenModal={handleOpenModal} />
        </div>
      </main>

      <Modal isOpen={isOpen} onConfirm={handleConfirmCheckout} />
    </div>
  );
};

export default Layout;
