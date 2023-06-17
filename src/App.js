import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Product from './components/admin/Product';
import EditProduct from './components/admin/EditProduct';
import EditColor from './components/admin/EditColor';
import EditStyle from './components/admin/EditStyle';
import CreateProduct from './components/admin/CreateProduct';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const getStatus = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
      // console.log(userInfo);
      if (userInfo !== null) {
        const role = userInfo.role;
        setIsLogin(() => true);
        if (role === 2) setIsAdmin(() => true);
      } else {
        setIsLogin(() => false);
        setIsAdmin(() => false);
      }
    }
    getStatus();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
        <Route path="registry" element={<Registry isLogin={isLogin} />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout isLogin={isLogin} />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="dashboard" element={<UserDashboard isAdmin={isAdmin} isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="admin" element={<AdminDashboard isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />}>
          <Route path="products" element={<Product isAdmin={isAdmin} />} />
          <Route path="product/create" element={<CreateProduct isAdmin={isAdmin} />} />
          <Route path="product/edit/:id" element={<EditProduct isAdmin={isAdmin} />} />
          <Route path="product-color/edit/:id/:color" element={<EditColor isAdmin={isAdmin} />} />
          <Route path="product-style/edit/:id/:style" element={<EditStyle isAdmin={isAdmin} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
