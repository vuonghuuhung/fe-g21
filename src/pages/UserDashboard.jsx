import { useEffect, useState } from "react";
import { logout } from "../services/apis/auth";
import { useNavigate } from "react-router";
import { getCities, getDistricts, getUrbans } from "../services/apis/address";
import { getOrderListById } from "../services/apis/authOrders";

const UserDashboard = ({ isLogin, isAdmin, setIsLogin }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  const handleRating = (orderId, rating) => {
    console.log(`Rated order ${orderId} with ${rating} stars`);
  };

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

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const cities = await getCities();
      const city = cities.filter((city) => city.id === userInfo.city_id)[0]
        .name;
      const districts = await getDistricts(userInfo.city_id);
      const district = districts.filter(
        (district) => district.id === userInfo.district_id
      )[0].name;
      const urbans = await getUrbans(userInfo.district_id);
      const urban = urbans.filter((urban) => urban.id === userInfo.urban_id)[0]
        .name;
      setAddress(`${city}, ${district}, ${urban}`);
      const orders = await getOrderListById(userInfo.id);
      setOrders(orders);
    };
    getUserInfo();
  }, []);

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
          {isAdmin && (
            <p
              className="ml-5 border-b-2 inline-block border-dashed pt-4 text-base font-semibold hover:cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </p>
          )}
          <hr className="w-10 mt-8" />
        </div>
        <div className="basis-1/2 flex flex-col gap-40">
          <div className="basis-1/2">
            <h1 className="text-2xl font-semibold">Order History</h1>
            <hr className="w-10 my-4" />
            {!orders ? (
              <p>You haven't placed any orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-item mb-5">
                  <p className="order-info">
                    Order ID: {order.id} | Total Price: ${order.total_price} |{" "}
                    <span
                      onClick={() =>
                        navigate(`/order-detail/${order.id}`, {
                          state: { order },
                        })
                      }
                      className="cursor-pointer"
                    >
                      View Detail
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="basis-1/2">
            <h1 className="text-2xl font-semibold">Account Details</h1>
            <hr className="w-10 my-4" />
            <p>{address}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
