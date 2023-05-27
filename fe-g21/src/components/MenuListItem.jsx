import ProductCard from "./ProductCard";
import { ArrowDown } from "./svg/Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MenuListItem({
  className = "",
  open = false,
  products = null,
}) {
  let separatedProducts = null;
  if (products != null) {
    separatedProducts = products.slice(0, 5);
  }

  return (
    <>
      <ArrowDown className={"group-hover:rotate-180"} />
      <div className={className + " h-0 group-hover:h-[550px]"}>
        {separatedProducts != null ? (
            <Swiper
              loop={false}
              slidesPerView={5}
            >
              {/* <div className="swiper-button-prev"></div> */}
              {separatedProducts.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
              {/* <div className="swiper-button-next"></div> */}
            </Swiper>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
