import { useState } from "react";
import { Link } from "react-router-dom";

const Registry = () => {

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState ('');
  const [LastName, setLastName] = useState ('');

  const validateEmail = (str) => {
    if (!(str.slice (str.length - 10, str.length) === "@gmail.com")){
      return false;
    } 
    return true;
  } 

  const handleCreate = (e) => {
    e.preventDefault();
    console.log (validateEmail(Email));
    console.log ({FirstName, LastName, Email, Password});
  }

  return (
    <div className="w-full">
      <h2 className="text-4xl font-semibold flex justify-center mt-16 mb-16">Create Account </h2>
      <div className="w-full flex justify-center">
        <input value={FirstName}
          type="text"
          name="FirstName"
          id="fname"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input value={LastName}
          type="text"
          name="Lastname"
          id="lastname"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          className="bg-gray-100 rounded-none	w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none" />
      </div>
      <div className="w-full flex justify-center">
        <input value={Email}
          type="text"
          name="Email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input value={Password}
          type="password"
          name="Password"
          id="pass"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="flex justify-center w-full">
        <input type="button"
          value="Create"
          className="w-1/3 py-2 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 mb-8 border-2 border-black"
          onClick={(e) => handleCreate(e)}
        />
      </div>
    </div>
  );
};

export default Registry;
