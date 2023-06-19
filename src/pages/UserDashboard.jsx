import { useEffect } from "react";
import { logout } from "../services/apis/auth";
import { useNavigate } from "react-router";

const UserDashboard = ({ isLogin, isAdmin, setIsLogin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="w-full flex flex-row justify-center items-center text-[#565656]">
        <div className="basis-1/2 p-80">
          <h1 className="text-[4.75rem] font-bold">My Account</h1>
          <p
            className="border-b-2 inline-block border-dashed pt-4 text-base font-semibold hover:cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </p>
          {isAdmin && <p
            className="ml-5 border-b-2 inline-block border-dashed pt-4 text-base font-semibold hover:cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </p>}
          <hr className="w-10 mt-8" />
        </div>
        <div className="basis-1/2 flex flex-col gap-40">
          <div className="basis-1/2">
            <h1 className="text-2xl font-semibold">Order History</h1>
            <hr className="w-10 my-4" />
            <p>You haven't placed any orders yet.</p>
          </div>
          <div className="basis-1/2">
            <h1 className="text-2xl font-semibold">Account Details</h1>
            <hr className="w-10 my-4" />
            <p>Address</p>
            <p>City</p>
            <p className="pt-4">View Addresses (1)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
