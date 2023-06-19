import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MenuListItem from "./MenuListItem";
import { getProductList, searchProduct } from "../services/apis/product";
import CartContext from "./CartContext";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { createPayment } from "../services/apis/payment";

const Navbar = () => {
  const { quantityInCart } = useContext(CartContext);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const [findingPhrase, setFindingPhrase] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFinding = async () => {
      try {
        const response = await searchProduct(findingPhrase);
        setFoundProducts((prevState) => response);
      } catch (error) {
        console.log(error);
      }
    };
    handleFinding();
  }, [findingPhrase]);

  const inputFindTriggers = {
    onFocus: () => {
      setIsInputOnFocus(true);
    },
    onBlur: () => {
      setIsInputOnFocus(false);
      setFindingPhrase("");
    },
  };

  return (
    <>
      <header className="relative z-10 w-full font-OpenSan bg-white flex flex-row justify-between items-center px-20 min-h-[104px]">
        <div className="basis-1/4 text-sm font-semibold">
          <Link to="/">
            <img
              className="max-w-[250px]"
              src="https://cdn.shopify.com/s/files/1/0001/5211/files/pk-logotype-dark.png?v=1674686921&width=500"
              alt="logo"
            />
          </Link>
        </div>
        {isInputOnFocus ? null : (
          <nav className="basis-2/4 gap-10 flex justify-end text-sm font-semibold mr-10">
            <span onClick={() => navigate("/products/0?page=1")} className="cursor-pointer group flex h-[104px] items-center">Shop All</span>
            <span onClick={() => navigate("/products/1")} className="cursor-pointer flex group h-[104px] items-center">
              Notebooks & Planners
            </span>
            <span onClick={() => navigate("/products/2")} className="cursor-pointer flex group h-[104px] items-center">
              Desk Supplies
            </span>

            <span onClick={() => navigate("/products/3")} className="cursor-pointer flex group h-[104px] items-center">
              Home & Lifestyle
            </span>
          </nav>
        )}
        <div
          className={
            "basis-1/4 flex " + (isInputOnFocus ? "basis-3/4 justify-end" : "")
          }
        >
          <form action="/" method="get">
            <div
              className={
                "bg-slate-200 items-center flex w-full " +
                (isInputOnFocus ? "h-14" : "h-10")
              }
            >
              <svg
                className="modal__toggle-open inline-block mx-3"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.785 1.85042C8.3178 -0.616806 4.31764 -0.616806 1.85042 1.85042C-0.616806 4.31764 -0.616806 8.3178 1.85042 10.785C4.07768 13.0123 7.55376 13.2288 10.0242 11.435L14.4529 15.8637C14.6347 16.0455 14.9294 16.0454 15.1112 15.8637L15.8636 15.1113C16.0454 14.9295 16.0454 14.6347 15.8636 14.4529L11.435 10.0243C13.2288 7.55379 13.0123 4.07769 10.785 1.85042ZM3.26114 3.26114C4.94924 1.57304 7.6862 1.57304 9.3743 3.26114C11.0613 4.94814 11.0624 7.68261 9.37762 9.37097L9.37097 9.37762C7.68261 11.0624 4.94814 11.0613 3.26114 9.3743C1.57304 7.6862 1.57304 4.94924 3.26114 3.26114Z"
                  fill="#007aff"
                ></path>
              </svg>
              <input
                {...inputFindTriggers}
                className={
                  "bg-slate-200 font-semibold leading-3 pr-3.5 mr-4 focus:outline-none transition-all ease-in-out duration-500 " +
                  (isInputOnFocus ? "w-[32rem] text-xl" : "w-full text-sm")
                }
                placeholder="Search..."
                type="text"
                onChange={(e) => {
                  setFindingPhrase((prevState) => e.target.value);
                }}
                value={findingPhrase}
              />
            </div>
          </form>
          <NavLink className="flex ml-6 items-center gap-4" to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              role="presentation"
              viewBox="0 0 18 19"
              width="20px"
              height="20px"
              className="inline-block"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
                fill="#007aff"
                stroke="#007aff"
                strokeWidth={1}
              ></path>
            </svg>
          </NavLink>
          <NavLink className="flex ml-6 items-center gap-4 relative" to="/cart">
            <span className="absolute text-[0.6rem] left-[42%] top-[20%] font-bold">
              {quantityInCart}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block relative"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5 18.5C19.3284 18.5 20 19.1716 20 20C20 20.8284 19.3284 21.5 18.5 21.5C17.6716 21.5 17 20.8284 17 20C17 19.1716 17.6716 18.5 18.5 18.5ZM8.5 18.5C9.32843 18.5 10 19.1716 10 20C10 20.8284 9.32843 21.5 8.5 21.5C7.67157 21.5 7 20.8284 7 20C7 19.1716 7.67157 18.5 8.5 18.5ZM5 2.5C5.45887 2.5 5.85885 2.8123 5.97014 3.25746L8.78078 14.5H18.2192L19.9086 7.74254C19.9756 7.47464 20.247 7.31176 20.5149 7.37873L21.4851 7.62127C21.753 7.68824 21.9158 7.95971 21.8489 8.22761L19.9701 15.7425C19.8589 16.1877 19.4589 16.5 19 16.5H8C7.54113 16.5 7.14115 16.1877 7.02986 15.7425L4.21922 4.5H2.5C2.22386 4.5 2 4.27614 2 4V3C2 2.72386 2.22386 2.5 2.5 2.5H5Z"
                fill="#007aff"
              ></path>
            </svg>
          </NavLink>
        </div>
      </header>
      <div
        className={
          "w-full bg-white transition-all ease-in-out duration-500 overflow-hidden " +
          (findingPhrase !== "" ? "h-[550px] px-20 pb-20" : "h-0")
        }
      >
        <h1>Searching for "{findingPhrase}"</h1>
        <div>
          <Swiper loop={false} slidesPerView={5}>
            {foundProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Navbar;
