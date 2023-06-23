import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apis/auth";
import { Loading } from "../components/svg/Icon";

const Login = ({ isLogin, setIsLogin, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPressLogin, setIsPressLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  });

  const validateEmail = (str) => {
    if (!(str.slice(str.length - 10, str.length) === "@gmail.com")) {
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(validateEmail(email));
    console.log({
      email,
      password,
    });
    setIsPressLogin(true);
    const role = await login(email, password);
    setIsPressLogin(false);
    if (role) {
      if (role === 2) {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        setIsLogin(true);
        navigate("/");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
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
        <h2 className="text-4xl font-semibold text-center mt-8 mb-6">LOGIN</h2>
        {isPressLogin && <span>Log in ...</span>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="mb-6">
          <input
            value={email}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <div className="mb-6">
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 rounded-md border-2 focus:outline-none focus:border-orange-300"
          />
        </div>
        <p className="text-center text-gray-600 mb-4">
          <Link to="#">Forgot your Password?</Link>
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-gray-200 active:bg-gray-300 hover:bg-gray-300 text-black rounded-md"
          >
            Login
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4">
          <Link to="/registry">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
