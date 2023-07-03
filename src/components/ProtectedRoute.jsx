import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { analysis } from "../services/apis/authOrders";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") || null;
    if (!isAdmin) {
      navigate("/unauth");
    }
  }, []);
  return <Outlet />;
};

export default ProtectedRoute;
