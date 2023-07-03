import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Registry from './pages/Registry';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductList from './pages/ProductList';
import Product from './components/admin/product/Product';
import EditProduct from './components/admin/product/EditProduct';
import EditColor from './components/admin/product/EditColor';
import EditStyle from './components/admin/product/EditStyle';
import CreateProduct from './components/admin/product/CreateProduct';
import User from './components/admin/user/User';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './components/admin/user/UserProfile';
import Order from './components/admin/order/Order';
import ProductDetail from './pages/ProductDetail';
import OrderDetail from './components/admin/order/OrderDetail';
import UserOrderDetail from './pages/OrderDetail';
import AdminHome from './components/admin/AdminHome';
import UnAuth from './pages/UnAuth';
import PaymentSuccess from './pages/PaymentSuccess';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from './components/admin/product/Category';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const getStatus = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
      // console.log(userInfo);
      if (userInfo !== null) {
        const role = userInfo.role;
        setIsLogin(() => true);
        if (role === 2) setIsAdmin(() => true);
        toast.success(
          'Welcome, ' + userInfo.firstname + ' ' + userInfo.lastname
        );
      } else {
        setIsLogin(() => false);
        setIsAdmin(() => false);
      }
    };
    getStatus();
  }, [isLogin]);

  const ProtectedRoute = ({ isAdmin, redirectPath = '/unauth' }) => {
    if (!isAdmin) {
      return <Navigate to={redirectPath} replace />;
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
    toast.success('Welcome, ' + userInfo.firstname + ' ' + userInfo.lastname);
    return <Outlet />;
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="login"
            element={
              <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route path="registry" element={<Registry isLogin={isLogin} />} />
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart isLogin={isLogin} />} />
            <Route path="checkout" element={<Checkout isLogin={isLogin} />} />
            <Route path="payment-success/:id" element={<PaymentSuccess />} />
            <Route path="products/:id" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="order-detail/:id" element={<UserOrderDetail />} />
            <Route
              path="dashboard"
              element={
                <UserDashboard
                  isAdmin={isAdmin}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="*/:error" element={<Error />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={isAdmin} />}>
            <Route
              path="admin"
              element={
                <AdminDashboard
                  setIsLogin={setIsLogin}
                  setIsAdmin={setIsAdmin}
                />
              }
            >
              <Route path="" element={<AdminHome />} />
              <Route path="categories" element={<Category />} />
              <Route path="products" element={<Product />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="product/edit/:id" element={<EditProduct />} />
              <Route
                path="product-color/edit/:id/:color"
                element={<EditColor />}
              />
              <Route
                path="product-style/edit/:id/:style"
                element={<EditStyle />}
              />
              <Route path="users" element={<User />} />
              <Route path="user/view/:id" element={<UserProfile />} />
              <Route path="orders" element={<Order />} />
              <Route path="order/view/:id" element={<OrderDetail />} />
            </Route>
          </Route>
          <Route path="unauth" element={<UnAuth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
