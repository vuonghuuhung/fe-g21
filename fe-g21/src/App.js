import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectRoute";
import Login from "./pages/Login";
import Registry from "./pages/Registry";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login setUser={setUser} />} />
          <Route path='Registry' element={<Registry setUser={setUser}/>} />
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
