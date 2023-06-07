import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import CartContext from "../components/CartContext";

const SharedLayout = () => {
  const [quantityInCart, setQuantityInCart] = useState(0);

  const addProduct = (productId) => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const isProductExist = storedCartItems.some(
      (item) => item === productId
    );

    if (!isProductExist) {
      const updatedCartItems = [...storedCartItems, productId];

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setQuantityInCart(updatedCartItems.length);
    }
  }

  const contextData = {
    quantityInCart,
    addProduct
  }

  return (
    <>
      <CartContext.Provider value={contextData}>
        <Navbar />
        <Outlet />
        <Footer />
      </CartContext.Provider>
    </>
  );
};
export default SharedLayout;
