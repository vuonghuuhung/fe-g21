// lấy được id vật thu được vào rỏ hàng
import { useEffect, useState } from "react";
// import { AiFillExclamationCircle } from "react-icons/ai";
// import { AiOutlineEye } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { getProductById } from "../services/apis/product";
import { useNavigate } from "react-router-dom";

const Cart = ({ isLogin }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      products.forEach((product) => {
        if (product.type.length === 0) product.price = 0;
        else product.price = product.type[0].fixed_price;
        total += product.quantity * product.price;
      });
      return total;
    };

    setCartTotal(calculateTotal());
  }, [products]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    const fetchProduct = async (itemId) => {
      try {
        const product = await getProductById(itemId);
        product.quantity = 1;
        setProducts((prevProducts) => [...prevProducts, product]);
      } catch (error) {
        console.log(error);
      }
    };

    cartItems.forEach((itemId) => {
      fetchProduct(itemId);
    });
  }, [cartItems]);

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    const updatedCartItems = products
      .filter((product) => product.id !== productId)
      .map((product) => product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });

    // Cập nhật danh sách sản phẩm với số lượng mới
    setProducts(updatedProducts);
  };

  const handleOptionChange = (productId, event) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            selectedOption: event.target.value,
          };
        }
        return product;
      })
    );
  };

  const handleCheckout = () => {
    const productsParam = encodeURIComponent(JSON.stringify(products));
    navigate(`/checkout?products=${productsParam}`);
  };

  return (
    <div className="bg-white md:m-20 grid gap-x-20 grid-rows-2 grid-cols-1 md:grid-rows-1 m-4 md:grid-cols-7">
      <div className="md:col-span-4 ">
        <h2 className="text-3xl font-medium">Your Cart ({products.length})</h2>
        {products.map((product, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 gap-1 mt-6">
              <img src={product.image} alt="" className="col-span-2" />
              <div className="col-span-7 pl-4">
                <h4 className="font-medium">{product.product_name}</h4>
                <div>
                  <input
                    type="number"
                    name="amount"
                    id={product.id}
                    className="bg-gray-200 w-1/5 mt-3"
                    min={1}
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Color or Style:{" "}</span>
                  <select
                    value={product.selectedOption || ""}
                    onChange={(e) => handleOptionChange(product.id, e)}
                    className="bg-gray-200 w-2/5 mt-3"
                  >
                    <option value="">Select an option</option>
                    {product.type.length > 0 ? product.type.map((option, optionIndex) => (
                      <option key={optionIndex} value={option.style_name || option.color_name}>
                        {option.style_name || option.color_name}
                      </option>
                    )) : ""}
                  </select>
                </div>
              </div>
              <div className="col-span-3 relative">
                <CiTrash
                  className="absolute top-0 right-0 text-blue-500 text-xl hover:text-blue-400 hover:cursor-pointer"
                  onClick={() => deleteProduct(products[index].id)}
                />
                <div className="absolute bottom-0 right-0">
                  ${product.type.length > 0 ? product.type[0].fixed_price : 0}
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-blue-500 my-6"></div>
          </div>
        ))}
      </div>
      <div className="md:col-span-3 w-full">
        <div className="mt-10 w-full">
          <div className="text-green-500 flex justify-center mb-2">
            You've reached FREE shipping!
          </div>
          <div className="h-2 bg-green-600 rounded-lg w-full"></div>
          <div className="mt-2 flex justify-between">
            <div>Subtotal</div>
            <div>${cartTotal}</div>
          </div>
          <div className="mt-1 flex justify-between">
            <div>Shipping</div>
            <div>Free</div>
          </div>
          <div className="mt-2 flex justify-between text-lg font-semibold">
            <div>Estimated Total</div>
            <div>${cartTotal}</div>
          </div>
          <div
            onClick={() =>
              isLogin ? handleCheckout() : navigate("/login")
            }
            className="h-12 mt-4 bg-blue-500 p-3 flex justify-center text-white rounded-3xl hover:bg-blue-400 cursor-pointer"
          >
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
