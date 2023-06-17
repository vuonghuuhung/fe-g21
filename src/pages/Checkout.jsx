import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import {
  AiOutlineShoppingCart,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import cart from "../mocks/cartData";
import Select from "react-select";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCities, getDistricts, getUrbans } from "../services/apis/address";
import { ArrowDown } from "../components/svg/Icon";

const Checkout = ({isLogin}) => {
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [urban, setUrban] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [urbans, setUrbans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (city) {
      fetchDistricts(city);
    }
    // eslint-disable-next-line
  }, [city]);

  useEffect(() => {
    if (district) {
      fetchUrbans(district);
    }
  }, [district]);

  const fetchCities = async () => {
    try {
      const response = await getCities();
      setCities(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await getDistricts(cityId);
      setDistricts((prevState) => (prevState = response));
      console.log(districts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUrbans = async (districtId) => {
    try {
      const response = await getUrbans(districtId);
      setUrbans(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    setDistrict("");
    setUrban("");
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setUrban("");
  };

  const handleUrbanChange = (event) => {
    const selectedUrban = event.target.value;
    setUrban(selectedUrban);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productsParam = searchParams.get("products");
    const parsedProducts = JSON.parse(decodeURIComponent(productsParam));
    console.log(parsedProducts);
    setProducts(parsedProducts);
  }, [location.search]);

  useEffect(() => {
    const getTotal = () => {
      const total = products.reduce((prev, produce) => {
        return prev + produce.quantity * produce.price;
      }, 0);
      setTotal(total);
    };

    getTotal();
  }, [products]);

  return (
    <div className="w-full px-4 py-4 gap-x-12 md:mt-2 md:grid md:grid-cols-5">
      <div className="order-2 md:grow-2 md:col-start-4 md:col-end-6">
        <div className="mt-24">
          {products.map((product) => (
            <div className="my-4 grid grid-cols-5 gap-x-2">
              <div className="col-span-1 border-1.5 rounded-md relative">
                <img src={product.image} alt="" />
                <div className="-top-4 -right-4 border-1.5 block rounded-full absolute w-8 bg-gray-500 text-white mr-auto ml-auto h-8 px-2.5 pb-0.5 min-h-fit">
                  <div className="inline-block">{product.quantity}</div>
                </div>
              </div>
              <div className="col-span-3 mt-auto mb-auto text-base">
                {product.product_name}<span className="ml-3 text-slate-500">({product.selectedOption}hehe)</span>
              </div>
              
              <div className="col-span-1 ml-auto mt-auto mb-auto">
                ${product.price}
              </div>
            </div>
          ))}
        </div>

        <div className="h-0.5 bg-gray-200 "></div>
        <div className="my-4">
          <div className="inline-block ">Total</div>
          <div className="inline-block float-right">${total}</div>
        </div>
        <div className="my-4">
          <div className="inline-block ">Shipping</div>
          <div className="inline-block float-right text-sm">Free</div>
        </div>
        <div className="w-full bg-gray-500 h-0 5"></div>
        <div className="h-12 mt-4 bg-blue-500 p-3 flex justify-center text-white rounded-3xl hover:bg-blue-400 cursor-pointer">
          Order
        </div>
      </div>

      <div className="w-full order-1 md:col-start-1 md:col-end-4 md:p-8">
        <div className="inline-block text-blue-600 text-sm">Cart</div>
        <AiOutlineRight className="inline-block ml-1 relative bottom-0.5 text-xs " />
        <div className="inline-block ml-1 text-sm">Payment</div>
        <div className="mt-10">
          <div className="mt-8">
            <div>Shipping address</div>
            <div className="md:grid md:grid-cols-2 md:gap-x-4">
              <input
                type="text"
                name=""
                id=""
                className="md:col-span-1 p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
                placeholder="First name"
              />
              <input
                type="text"
                name=""
                id=""
                className="md:col-span-1 p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
                placeholder="Last name"
              />
            </div>
            <input
              type="text"
              name=""
              id=""
              className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
              placeholder="Company (option)"
            />
            <input
              type="text"
              name=""
              id=""
              className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
              placeholder="Address"
            />
            <input
              type="text"
              name=""
              id=""
              className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
              placeholder="Apartment, suite, etc. (optional) "
            />
            <div className="md:grid md:grid-cols-1 gap-x-4">
              <select
                value={city}
                onChange={handleCityChange}
                className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
              >
                <option value="">-- Chọn thành phố --</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {city && (
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
                >
                  <option value="">-- Chọn quận/huyện --</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              )}
              {district && (
                <select
                  value={urban}
                  onChange={handleUrbanChange}
                  className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
                >
                  <option value="">-- Chọn xã/phường --</option>
                  {urbans.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <input
              type="text"
              name=""
              id=""
              className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300"
              placeholder="Phone "
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 my-4 mt-8">
              By signing up via text, you agree to receive recurring automated
              marketing messages, including cart reminders, at the phone number
              provided. Consent is not a condition of purchase. Reply STOP to
              unsubscribe. Reply HELP for help. Message frequency varies. Msg &
              data rates may apply. View our Privacy Policy and Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
