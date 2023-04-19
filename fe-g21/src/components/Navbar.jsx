import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full p-2 bg-gray-400 flex justify-between">
      <NavLink className="px-3 py-2 text-white bg-blue-300 rounded-md" to="/">
        Poketo
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/shopp-all"
      >
        Shop All
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/best-sellers"
      >
        Best Sellers
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/notebooks-planners"
      >
        Notebooks & Planners
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/desk-supplies"
      >
        Desk Supplies
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/home-lifestyle"
      >
        Home & Lifestyle
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className="px-3 py-2 text-white bg-blue-300 rounded-md"
        to="/cart"
      >
        Cart
      </NavLink>
    </nav>
  );
};

export default Navbar;
