import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectRoute";
import Login from "./pages/Login";
import Registry from "./pages/Registry";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductList from "./pages/ProductList";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path='registry' element={<Registry />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='product-list' element={<ProductList />} />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
