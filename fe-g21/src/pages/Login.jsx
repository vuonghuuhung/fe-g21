import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const validateEmail = (str) => {
    if (!(str.slice (str.length - 10, str.length) === "@gmail.com")){
      return false;
    } 
    return true;
  } 
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log (validateEmail(Email)) 
    console.log ({
      Email,
      Password
    })
  }
  
  return (
    <div className="w-full">
      <h2 className="text-4xl font-semibold flex justify-center mt-16 mb-16">LOGIN</h2>
      <div className="w-full flex justify-center">
        <input value={Email}
          type="text"
          name="emailname"
          id="emailid"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 rounded-none w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none"
        />
      </div>
      <div className="w-full flex justify-center">
        <input value={Password} 
        type="text" 
        name="passwordname" 
        id="passwordid" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-100 rounded-none	w-1/3 p-2 mb-8 focus:border-orange-300 focus:border-2 focus:outline-none" />
      </div>
      <p className="decoration-1 underline flex justify-center my-2">
        <Link to="?">Forgot your Password ?</Link>
      </p>
      <div className="flex justify-center w-full">
        <input type="button" 
        value="Login" 
        className="cursor-pointer w-1/3 py-2 bg-gray-200 active:bg-gray-200 hover:bg-gray-300 border-2 border-black" 
        onClick={(e) => handleLogin(e)}
        />
      </div>
      <p className="decoration-1 underline flex justify-center my-5">
        <Link to="/registry">Create account</Link>
      </p>
    </div>
  );
};

export default Login; 
