import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectRoute';
import Login from './pages/Login';
import Registry from './pages/Registry';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductList from './pages/ProductList';
import Product from './components/admin/Product';
import EditProduct from './components/admin/EditProduct';
import EditColor from './components/admin/EditColor';
import EditStyle from './components/admin/EditStyle';
import CreateProduct from './components/admin/CreateProduct';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="registry" element={<Registry />} />
          <Route path="cart" element={<Cart isLogin={isLogin} />} />
          <Route path="checkout" element={<Checkout isLogin={isLogin} />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<Product />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="product-color/edit/:id/:color" element={<EditColor />} />
          <Route path="product-style/edit/:id/:style" element={<EditStyle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
