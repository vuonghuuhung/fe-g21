import { useRef, useState } from "react";

function SelectDropdown({ list }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="py-4 relative flex w-[90%] m-auto cursor-pointer">
      <select
        className="ring-2 ring-blue-500 border rounded-full appearance-none form-select px-4 py-3 pl-3 w-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        onChange={handleChange}
        value={selectedValue}
      >
        <option value="">Set of {list.length}</option>
        {list.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none cursor-pointer">
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon-arrow-down"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.3033 2.51037C11.4986 2.31511 11.4986 1.99852 11.3033 1.80326L10.5962 1.09615C10.401 0.900892 10.0844 0.900892 9.88913 1.09615L6.00075 4.98453L2.11095 1.09615C1.91569 0.900891 1.59911 0.900892 1.40385 1.09615L0.69674 1.80326C0.501478 1.99852 0.501477 2.3151 0.696739 2.51037L4.58653 6.39875L4.58583 6.39945L5.64649 7.46011C5.84175 7.65538 6.15833 7.65538 6.35359 7.46011L11.3033 2.51037Z"
            fill="#0085ca"
          ></path>
        </svg>
      </div>
    </div>
  );
}

const Options = ({ options, productTitle }) => {
  if (options.colors != undefined) {
    return (
      <div className="w-full">
        {options.colors.map((color, index) => {
          console.log(index);
          if (index <= 6) {
            return (
              <label key={Math.random()} htmlFor={color.colorName}>
                <div className="inline-block -ml-2 min-h-[1.5rem] pl-[1.5rem] pt-3">
                  <input
                    value={color.colorName}
                    className="inline-block p-3 bg-cover bg-center bg-no-repeat hover:border-slate-600 hover:border-2 -ml-[0.5rem] cursor-pointer appearance-none border-2 rounded-full transition-all checked:border-slate-900 checked:border-2"
                    type="radio"
                    name={"color-picker" + productTitle}
                    style={{
                      background:
                        color.backgroundSrc != undefined
                          ? `url(${color.backgroundSrc})`
                          : `${color.backgroundCode}`,
                    }}
                  />
                </div>
              </label>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
  if (options.types != undefined) {
    return <SelectDropdown list={options.types} />;
  }
};

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const productCardRef = useRef();

  const handleMouseEnter = () => {
    product.onHoverImg != undefined
      ? setCurrentImage(product.onHoverImg)
      : setCurrentImage(product.imgSrc);
  };

  const handleMouseLeave = () => {
    setCurrentImage(product.imgSrc);
  };

  return (
    <div className="w-[85%] h-fit">
      <div
        className="h-fit w-full object-cover sm:h-80 lg:h-96 block bg-cover bg-center bg-no-repeat transition-[background-image] duration-[0.3s] ease-in-out cursor-pointer"
        ref={productCardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${currentImage})` }}
      ></div>
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
      {product.options != undefined ? (
        <Options options={product.options} productTitle={product.title} />
      ) : null}
    </div>
  );
};

export default ProductCard;
