import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCities, getDistricts, getUrbans } from "../services/apis/address";
import { ArrowDown } from "../components/svg/Icon";
import { registry } from "../services/apis/registry";

const Registry = () => {
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

  const handleWardChange = (event) => {
    const selectedUrban = event.target.value;
    setUrban(selectedUrban);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(validateEmail(email));
    try {
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
        alert("User register successfully!");
        navigate("/login");
      } else {
        alert("User register failed! Try again.");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-semibold flex justify-center mt-16 mb-16">
        Create Account{" "}
      </h2>
      <div className="w-full flex justify-center">
        <input
          value={firstName}
          type="text"
          name="FirstName"
          id="fname"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          value={lastName}
          type="text"
          name="Lastname"
          id="lastname"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="bg-gray-100 rounded-none	w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          value={email}
          type="text"
          name="Email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          value={password}
          type="password"
          name="Password"
          id="pass"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          value={phoneNumber}
          type="tel"
          name="Phone"
          id="phone"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-1/3 flex m-auto relative">
        {/* <label>Thành phố:</label> */}
        <select
          value={city}
          onChange={handleCityChange}
          className="bg-gray-100 rounded-none w-full p-2 mb-8 focus:outline-none"
        >
          <option value="">-- Chọn thành phố --</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <div className="absolute top-3 right-0 flex items-center px-2 pointer-events-none bg-gray-100">
          <ArrowDown className="w-3 h-4 text-gray-400" />
        </div>
      </div>

      {city && (
        <div className="w-1/3 flex m-auto relative">
          {/* <label>Quận/Huyện:</label> */}
          <select
            value={district}
            onChange={handleDistrictChange}
            className="bg-gray-100 rounded-none w-full p-2 mb-8 focus:outline-none"
          >
            <option value="">-- Chọn quận/huyện --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          <div className="absolute top-3 right-0 flex items-center px-2 pointer-events-none bg-gray-100">
            <ArrowDown className="w-3 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {district && (
        <div className="w-1/3 flex m-auto relative">
          {/* <label>Xã/Phường:</label> */}
          <select
            value={urban}
            onChange={handleWardChange}
            className="bg-gray-100 rounded-none w-full p-2 mb-8 focus:outline-none"
          >
            <option value="">-- Chọn xã/phường --</option>
            {urbans.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
          <div className="absolute top-3 right-0 flex items-center px-2 pointer-events-none bg-gray-100">
            <ArrowDown className="w-3 h-4 text-gray-400" />
          </div>
        </div>
      )}
      <div className="flex justify-center w-full">
        <input
          type="button"
          value="Create"
          className="cursor-pointer w-1/3 py-2 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 mb-8 border-2 border-black"
          onClick={(e) => handleCreate(e)}
        />
      </div>
      <p className="decoration-1 underline flex justify-center my-5">
        <Link to="/login">Already have account?</Link>
      </p>
    </div>
  );
};

export default Registry;
