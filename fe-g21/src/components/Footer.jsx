import { BsFacebook } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { MdArrowUpward } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-blue-400 grid grid-rows-2 gap-1 px-16 pt-16 pb-8 text-white w-full">
      <div className="bg-blue-400 w-full">
        <h1 className="text-3xl pb-8 font-medium">POKETO</h1>
        <h4 className="text-xl pb-2">Newsletter Title</h4>
        <p className="">Get the scoop on new products, guidance, and more</p>
        <form action="" method="post" className="">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 block mt-6 mb-5 bg-blue-400 border-0 border-b-2  
          border-gray-300 placeholder:text-white w-4/5 focus:border-yellow-200 
          focus:outline-none focus:border-2 rounded"
            required
          />
          <input
            type="submit"
            value="Signup"
            className="font-medium py-2 pr-2 active:bg-blue-500 rounded"
          />
        </form>
      </div>
      <div className="bg-blue-400 grid grid-rows-2 grid-cols-2 gap-y-6 w-full">
        <div className="">
          <h3 className="font-medium mb-2">SHOP</h3>
          <p>Shop AlL</p>
          <p>Best Sellers</p>
          <p>Stationnery</p>
          <p>Home Decor</p>
          <p>Gift Cards</p>
        </div>
        <div className="">
          <h3 className="font-medium mb-2">LEARN</h3>
          <p>Sign Up for SMS</p>
          <p>Careers</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">HELP</h3>
          <p>FAQ</p>
          <p>Supplemental Privacy Policy</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">CONNECT</h3>
          <p>Wholesale</p>
          <p>Acquisitions</p>
          <p>Customization</p>
          <p>Store Location</p>
        </div>
      </div>
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
      <div className="mt-8 mb-8">
        <div className="inline-block float-left">© 2020 Pattern</div>
        <div className="inline-block float-right ml-3">Accessibility</div>
        <div className="inline-block float-right ml-3">Privacy Policy</div>
        <div className="inline-block float-right ml-3">Terms & Conditions</div>
      </div>
    </div>
  );
};

export default Footer;
