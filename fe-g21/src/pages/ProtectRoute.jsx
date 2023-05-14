import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLogin }) => {
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
