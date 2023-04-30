import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectRoute";
import Login from "./pages/Login";
import Registry from "./pages/Registry";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart"
import SingleProduct from "./components/SingleProduct/SingleProduct"
import ProductDetail from "./pages/ProductDetail";
function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='registry' element={<Registry setUser={setUser}/>} />
          <Route path='cart' element={<Cart setUser={setUser}/>} />
          <Route path='product-details' element={<ProductDetail />}/>
          <Route
            path='dashboard'
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            } />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
