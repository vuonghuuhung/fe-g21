import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import ProductCard from "../components/ProductCard";
import { NextPointer, PrevPointer } from "../components/svg/Icon";
import { useEffect, useState } from "react";
import { getTopPicks } from "../services/apis/product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getTopPicks();
        setProducts(productList);
      } catch (error) {
        navigate("*/500");
      }
    }; 

    fetchProducts();
  }, []);

  return (
    <>
      <section>
        <div className="relative z-0">
          <img
            src="https://cdn.shopify.com/s/files/1/0001/5211/files/PK--D-Home-Hero_685dec9e-c111-49ef-b583-f85e02ceae63.jpg?v=1679244093"
            alt="background"
          />
          <div className="max-w-[540px] bg-white absolute top-0 bottom-0 left-0 right-0 h-fit m-auto px-6 py-8">
            <h1 className="text-[46px] font-semibold">
              Art for Your Every Day
            </h1>
            <p className="">
              Cultivate a creative lifestyle with pens, planners, and more
              designed to bring joy to your daily routines.
            </p>
            <button className="bg-[#0085ca] text-white py-4 px-5 rounded-full mt-7 hover:bg-[#0085cab8]">
              Shop Poketo
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-[#b3e5b4] py-20">
          <div className="flex flex-row items-center px-16">
            <h1 className="text-4xl font-semibold text-black w-full pb-2">
              Poketo’s Top Picks. Most-loved stationery and more from the Poketo
              community
            </h1>
            <div className="bg-[#0085ca] p-4 rounded-full mr-5 swiper-button-prev cursor-pointer">
              <PrevPointer />
            </div>
            <div className="bg-[#0085ca] p-4 rounded-full swiper-button-next cursor-pointer">
              <NextPointer />
            </div>
          </div>
          <div className="pt-10">
            <Swiper
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next", 
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              slidesPerView={5.5}
              longSwipesMs={200}
            >
              {/* <div className="swiper-button-prev"></div> */}
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} option={false} />
                </SwiperSlide>
              ))}
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} option={false} />
                </SwiperSlide>
              ))}
              {/* <div className="swiper-button-next"></div> */}
            </Swiper>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full flex flex-row">
          <div className="basis-1/2">
            <img
              src="https://cdn.shopify.com/s/files/1/0001/5211/files/PK-D-M-Home-5050-2.jpg?v=1679063218"
              alt=""
            />
          </div>
          <div className="basis-1/2 relative bg-[#009639]">
            <div className="max-w-3xl bg-[#009639] absolute top-0 bottom-0 left-0 right-0 h-fit m-auto pl-20 py-8">
              <h1 className="text-[46px] font-semibold text-white">
                The 10-Minute Wallet Hack
              </h1>
              <p className="text-white">
                Upgrade your wallet with our best-selling sleek, yet spacious,
                Dome Wallet, now available in Black and Tan.
              </p>
              <button className="bg-white text-black py-4 px-5 rounded-full mt-7 hover:bg-[#ffffffb8]">
                Shop Dome Wallets
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full flex flex-row">
          <div className="basis-1/2 relative bg-[#ffc845]">
            <div className="max-w-3xl bg-[#ffc845] absolute top-0 bottom-0 left-0 right-0 h-fit m-auto pl-6 py-8">
              <h1 className="text-[46px] font-semibold text-black">
                Turn Over a New Page
              </h1>
              <p className="text-black">
                Staying organized this spring is super simple with our range
                ofxc colorful calendars and unique planners.
              </p>
              <button className="bg-[#0085ca] text-white py-4 px-5 rounded-full mt-7 hover:bg-[#0085cab8]">
                Shop Calendars & Planners
              </button>
            </div>
          </div>
          <div className="basis-1/2">
            <img
              src="https://cdn.shopify.com/s/files/1/0001/5211/files/PK-D-M-Home-5050-1_4_b426a4bd-1f1b-433d-bf78-0f48c545848b.gif?v=1679244140"
              alt=""
            />
          </div>
        </div>
      </section>
      <section>
        <div className="w-full flex flex-row">
          <div className="basis-1/2 flex bg-[#a38ac1] py-24 justify-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0001/5211/files/XPB-M-Home-5050-Media-PatternFamily-01-2x.jpg?v=1679056208"
              alt=""
            />
          </div>
          <div className="basis-1/2 relative bg-[#a38ac1]">
            <div className="max-w-3xl bg-[#a38ac1] absolute top-0 bottom-0 left-0 right-0 h-fit m-auto pl-20 py-8">
              <h1 className="text-[46px] font-semibold text-white">
                A Pattern Family of Brands
              </h1>
              <p className="text-white">
                We’re a collective of brands guided by one purpose: to make home
                more beautiful and more functional, room by room. Our products
                are thoughtfully designed to turn everyday motions into
                intentional, enjoyable rituals of everyday living.
              </p>
              <button className="bg-white text-black py-4 px-5 rounded-full mt-7 hover:bg-[#ffffffb8]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
