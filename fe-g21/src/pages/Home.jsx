import topPicks from "../mocks/top-pick";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import ProductCard from "../components/ProductCard";
// import 'swiper/css/navigation';

const Home = () => {

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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.95401 16.5159L9.23818 17.2318C9.04051 17.4294 8.72003 17.4294 8.52236 17.2318L0.648253 9.35765C0.450582 9.15998 0.450582 8.83949 0.648253 8.64182L8.52236 0.767719C8.72003 0.570047 9.04051 0.570047 9.23818 0.767719L9.95401 1.48355C10.1517 1.68122 10.1517 2.0017 9.95401 2.19937L4.16768 7.98758L16.9938 7.9874C17.2734 7.9874 17.5 8.21402 17.5 8.49357V9.5059C17.5 9.78545 17.2734 10.0121 16.9938 10.0121L4.16363 10.0122L9.95401 15.8001C10.1517 15.9978 10.1517 16.3183 9.95401 16.5159Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div className="bg-[#0085ca] p-4 rounded-full swiper-button-next cursor-pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M9.95401 16.5159L9.23818 17.2318C9.04051 17.4294 8.72003 17.4294 8.52236 17.2318L0.648253 9.35765C0.450582 9.15998 0.450582 8.83949 0.648253 8.64182L8.52236 0.767719C8.72003 0.570047 9.04051 0.570047 9.23818 0.767719L9.95401 1.48355C10.1517 1.68122 10.1517 2.0017 9.95401 2.19937L4.16768 7.98758L16.9938 7.9874C17.2734 7.9874 17.5 8.21402 17.5 8.49357V9.5059C17.5 9.78545 17.2734 10.0121 16.9938 10.0121L4.16363 10.0122L9.95401 15.8001C10.1517 15.9978 10.1517 16.3183 9.95401 16.5159Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="pt-10">
            <Swiper
              modules={[Pagination, Navigation]}
              navigation={{ 
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              loop={true}
              slidesPerView={5.5}
              longSwipesMs={1000}
            >
              {/* <div className="swiper-button-prev"></div> */}
              {topPicks.map((product, index) => 
                <SwiperSlide key={index}>
                  <ProductCard product={product}/>
                </SwiperSlide>
              )}
              {topPicks.map((product, index) => 
                <SwiperSlide key={index}>
                  <ProductCard product={product}/>
                </SwiperSlide>
              )}
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
                Staying organized this spring is super simple with our range ofxc
                colorful calendars and unique planners.
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
