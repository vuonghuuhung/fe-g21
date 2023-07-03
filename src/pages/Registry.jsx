import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCities, getDistricts, getUrbans } from "../services/apis/address";
import { ArrowDown } from "../components/svg/Icon";
import { registry } from "../services/apis/registry";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registry = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [urban, setUrban] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [urbans, setUrbans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
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

  const validateEmail = (str) => {
    if (!(str.slice(str.length - 10, str.length) === "@gmail.com")) {
      return false;
    }
    return true;
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

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(validateEmail(email));
    try {
      toast.info("Đang đăng ký...", {autoClose: 1000});
      const response = await registry({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        city_id: city,
        district_id: district,
        urban_id: urban,
        phone: phoneNumber,
      });
      if (response) {
        toast.success("Đăng ký thành công!", { autoClose: 1000});
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <ToastContainer />
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <Link to="/">
            <img
              className="h-12 w-auto"
              src="https://cdn.shopify.com/s/files/1/0001/5211/files/pk-logotype-dark.png?v=1674686921&width=500"
              alt="logo"
            />
          </Link>
        </div>
        <h2 className="text-4xl font-semibold text-center mt-8 mb-6">
          Create Account
        </h2>
        <div className="mb-6">
          <input
            value={firstName}
            type="text"
            name="FirstName"
            id="fname"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <input
            value={lastName}
            type="text"
            name="Lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <input
            value={email}
            type="text"
            name="Email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <input
            value={password}
            type="password"
            name="Password"
            id="pass"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <input
            value={phoneNumber}
            type="tel"
            name="Phone"
            id="phone"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        {city && (
          <div className="mb-6">
            <select
              value={district}
              onChange={handleDistrictChange}
              className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
            >
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {district && (
          <div className="mb-6">
            <select
              value={urban}
              onChange={handleUrbanChange}
              className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
            >
              <option value="">-- Select Urban --</option>
              {urbans.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCreate}
            className="w-full px-6 py-3 bg-gray-200 active:bg-gray-300 hover:bg-gray-300 text-black rounded-md"
          >
            Create
          </button>
        </div>
        <p className="text-center underline mt-5">
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
};

export default Registry;
