import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/log-in/LogIn";
import SetPassword from "./pages/set-password/SetPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { GlobalProvider } from "./context/GlobalContext";
import { UserList } from "./pages/Users/UserList";
import MenuEditor from "./pages/FoodMenu/MenuEditor";
import OrderHistory from "./pages/OrderHistory/OrderHistory/OrderHistory";
import AllOrders from "./pages/AllOrders/AllOrders/AllOrders";

const App = () => {
  return (
    <div>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route
              path="/admin/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/menu" element={<MenuEditor />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/all-Orders" element={<AllOrders />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
};

export default App;
