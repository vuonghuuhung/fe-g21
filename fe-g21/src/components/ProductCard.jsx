import { useRef, useState } from "react";
import ProductOptions from "./ProductOptions";

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const productCardRef = useRef();

  const handleMouseEnter = () => {
    product.onHoverImg !== undefined
      ? setCurrentImage(product.onHoverImg)
      : setCurrentImage(product.imgSrc);
  };

  const handleMouseLeave = () => {
    setCurrentImage(product.imgSrc);
  };

  return (
    <div className={"w-[85%] h-fit"}>
      <div
        className="group/cart relative h-fit w-full object-cover sm:h-80 lg:h-96 block bg-cover bg-center bg-no-repeat transition-[background-image] duration-[0.3s] ease-in-out cursor-pointer overflow-hidden"
        ref={productCardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="group-hover/cart:-translate-y-24 transition-all ease-in-out duration-[0.3s] absolute bg-slate-100/70 hover:bg-slate-100 w-[85%] left-[50%] translate-x-[-50%] rounded-full border-solid border-2 border-[#4b995c] -bottom-20">
          <button className="text-black text-center block w-full uppercase py-4">Add to card</button>
        </div>
      </div>
      <h2 className="mt-3 font-semibold text-gray-900 sm:text-2xl cursor-pointer">
        {product.title}
      </h2>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="pr-2 cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z"
                fill="#ef4043"
              ></path>
            </svg>
          </div>
          <div className="cursor-pointer">{product.avgRate}</div>
          <div className="pl-1 cursor-pointer">({product.totalRates})</div>
        </div>
        <div className="flex mr-0">
          <span>${product.price}</span>
        </div>
      </div>
      {product.options !== undefined ? (
        <ProductOptions
          options={product.options}
          productTitle={product.title}
        />
      ) : null}
    </div>
  );
};

export default ProductCard;
