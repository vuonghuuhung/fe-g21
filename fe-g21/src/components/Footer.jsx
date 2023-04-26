import { BsFacebook } from "react-icons/bs";
import { AiOutlineInstagram, AiFillCaretUp } from "react-icons/ai"
import { FaTiktok } from "react-icons/fa"
import { BsTwitter } from "react-icons/bs"
import { MdArrowUpward } from "react-icons/md"
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-400 flex flex-col gap-1 px-8 pt-16 pb-8 md:px-16 md:pt-8 text-white w-full md:h-auto">
      <div className="hidden md:flex text-base mb-16 justify-center ">
        <p className="mr-2">Meet our growing Family</p>
        <AiFillCaretUp className="relative top-1" />
      </div>
      <div className="bg-blue-400 w-full md:hidden">
        <h1 className="text-3xl pb-8 font-medium">POKETO</h1>
        <h4 className="text-xl pb-2">Newsletter Title</h4>
        <p className="">Get the scoop on new products, guidance, and more</p>
        <input type="email" placeholder="Enter your email"
          className="py-2 block mt-6 mb-5 bg-blue-400 border-0 border-b-2  
          border-gray-300 placeholder:text-white w-4/5 focus:border-yellow-200 
          focus:outline-none focus:border-2 rounded" required />
        <input type="submit" value="Signup" className="font-medium py-2 pr-2 active:bg-blue-500 rounded" />
      </div>
      <div className="bg-blue-400 grid grid-rows-2 grid-cols-2 gap-y-6 w-full md:grid-cols-6 md:grid-rows-1">
        <div className="">
          <h3 className="font-medium mb-2">SHOP</h3>
          <p className="text-base">Shop AlL</p>
          <p className="text-base">Best Sellers</p>
          <p className="text-base">Stationnery</p>
          <p className="text-base">Home Decor</p>
          <p className="text-base">Gift Cards</p>
        </div>
        <div className="">
          <h3 className="font-medium mb-2">LEARN</h3>
          <p className="text-base" >Sign Up for SMS</p>
          <p className="text-base">Careers</p>
        </div>
        <div className="">
          <h3 className="font-medium mb-2 ">HELP</h3>
          <p className="text-base">FAQ</p>
          <p className="text-base">Supplemental Privacy Policy</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">CONNECT</h3>
          <p className="text-base">Wholesale</p>
          <p className="text-base">Acquisitions</p>
          <p className="text-base">Customization</p>
          <p className="text-base">Store Location</p>
        </div>
        <div className="hidden md:block col-span-2">
          <h3 className="font-medium mb-2">Join Our Family</h3>
          <p className="text-base">Sign up for our Poketo newsletter. You'll be the first to hear about new arrivals, surprise savings, and more.</p>

          <input type="email" placeholder="Enter your email"
            className="py-2 block mt-6 mb-5 bg-blue-400 border-0 border-b-2  
          border-gray-300 placeholder:text-white w-4/5 focus:border-yellow-200 
          focus:outline-none focus:border-2 rounded" required />
          <input type="submit" value="Signup" className="font-medium py-2 pr-2 active:bg-blue-500 rounded" />

          <div className="mt-4">
            <div className="inline-block float-left pr-4 text-2xl">
              <BsFacebook />
            </div>
            <div className="inline-block float-left pr-4 text-2xl">
              <AiOutlineInstagram />
            </div>
            <div className="inline-block float-left pr-4 text-2xl">
              <FaTiktok />
            </div>
            <div className="inline-block float-left pr-4 text-2xl">
              <BsTwitter />
            </div>
            <div className="inline-block float-right pr-4 text-2xl">
              <MdArrowUpward />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 md:hidden">
        <div className="inline-block float-left pr-4 text-2xl">
          <BsFacebook />
        </div>
        <div className="inline-block float-left pr-4 text-2xl">
          <AiOutlineInstagram />
        </div>
        <div className="inline-block float-left pr-4 text-2xl">
          <FaTiktok />
        </div>
        <div className="inline-block float-left pr-4 text-2xl">
          <BsTwitter />
        </div>
        <div className="inline-block float-right pr-4 text-2xl">
          <MdArrowUpward />
        </div>
      </div>
      <div className="mt-8 mb-6 md:mt-16">
        <p className="float-left mb-1 w-full md:inline-block md:w-auto">© 2020 Pattern</p>
        <p className="float-left ml-3 mb-1 md:float-right md:ml-8">Accessibility</p>
        <p className="float-right ml-3 mb-1 md:float-right md:ml-8">Privacy Policy</p>
        <p className="float-left ml-3 mb-1 w-full md:float-right md:w-auto md:ml-8">Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
