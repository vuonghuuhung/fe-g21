// lấy được id vật thu được vào rỏ hàng
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import cart from "../mocks/cartData";
import topPicks from "../mocks/top-pick";

const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     const fetchProduct = async (itemId) => {
//       try {
//         const response = await axios.get(`your-api-url/products/${itemId}`);
//         const product = response.data;
//         setProducts((prevProducts) => [...prevProducts, product]);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     cartItems.forEach((itemId) => {
//       fetchProduct(itemId);
//     });
//   }, [cartItems]);

  //console.log (cart);
  let ListIteam = JSON.parse(localStorage.getItem("cart")) || [];
  // const [cart1, setCart] = useState(topPicks.map(topPick => {
  //     if (ListIteam.includes(topPick)) return topPick;
  // }));
  const [cart1, setCart] = useState(cart);
  const [total, setTotal] = useState(0);
  const updateProduct = (e) => {
    cart1.forEach((product) => {
      if (product.id === e.target.id) {
        product.amount = e.target.value;
      }
    });
    setCart([...cart1]);
  };
  const deleteProduct = (idc) => {
    setCart(cart1.filter((produce) => produce.id !== idc));
    console.log(cart1);
  };
  useEffect(() => {
    console.log(cart1);
    const getTotal = () => {
      const total1 = cart1.reduce((prev, produce) => {
        return prev + produce.amount * produce.price;
      }, 0);
      setTotal(total1);
    };

    getTotal();
  }, [cart1]);

  return (
    <div className="bg-white md:m-20 grid gap-x-20 grid-rows-2 grid-cols-1 md:grid-rows-1 m-4 md:grid-cols-7">
      <div className="md:col-span-4 ">
        <h2 className="text-3xl font-medium">Your Cart ({cart.length})</h2>
        {cart1.map((product, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 gap-1 mt-6">
              <img src={product.imglink} alt="" className="col-span-2" />
              <div className="col-span-7 pl-4">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-gray-500">{product.color}</p>
                <div>
                  <input
                    type="number"
                    name="amount"
                    id={product.id}
                    className="bg-gray-200 w-1/5 mt-3"
                    value={product.amount}
                    onChange={(e) => updateProduct(e)}
                  />
                </div>
              </div>
              {/* <div className="font-medium col-span-4 h-8 w-4/5 rounded-lg bg-gradient-to-r from-red-400 to-yellow-400 flex justify-start">
                                    <AiOutlineEye className="h-full relative left-2 text-white " />
                                    <p className="text-white relative top-0.5 left-3">Popularl 8 views</p>
                                </div> */}
              <div className="col-span-3 relative">
                <CiTrash
                  className="absolute top-0 right-0 text-blue-500 text-xl hover:text-blue-400 hover:cursor-pointer"
                  onClick={() => deleteProduct(cart1[index].id)}
                />
                <div className="absolute bottom-0 right-0">
                  ${product.price}.00
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-blue-500 my-6"></div>
          </div>
        ))}

        {/* <div className="h-12 mt-4 bg-blue-500 p-3 flex justify-center text-white rounded-3xl w-1/5 hover:bg-blue-400 cursor-pointer">Update</div> */}
      </div>
      <div className="md:col-span-3 w-full">
        <div className="mt-10 w-full">
          <div className="text-green-500 flex justify-center mb-2">
            You've reached FREE shipping!
          </div>
          <div className="h-2 bg-green-600 rounded-lg w-full"></div>
          <div className="mt-2 flex justify-between">
            <div>Subtotal</div>
            <div>${total}</div>
          </div>
          <div className="mt-1 flex justify-between">
            <div>Shipping</div>
            <div>Free</div>
          </div>
          <div className="mt-2 flex justify-between text-lg font-semibold">
            <div>Estimated Total</div>
            <div>${total}</div>
          </div>
          {/* <div className="cursor-pointer">
                        <p className="inline-block text-sm">or 4 payments of $19.25 with</p>
                        <img src="https://iconape.com/wp-content/files/wd/206573/png/affirm-logo.png" alt="" className="w-9 inline-block relative bottom-1 left-2" />
                        <AiFillExclamationCircle className="inline-block relative left-3 hover:text-blue-500 text-blue-600" />
                    </div> */}
          <div className="h-12 mt-4 bg-blue-500 p-3 flex justify-center text-white rounded-3xl hover:bg-blue-400 cursor-pointer">
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
