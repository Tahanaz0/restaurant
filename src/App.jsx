import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Header from "./component/Header/header.jsx";
import Sidebar from "./component/sidebar/sidebar.jsx"
import UserManagement from "./component/UserManagement/userManagement.jsx"; // ✅ ye page banayenge
import "./App.css";
import SupperMarket from "./component/supperMarket/SupperMarket.jsx";
import PaymentFinance from "./component/Payment-finance/Payment-finance.jsx";
import Notification from "./component/notification/Notification.jsx";

function LayoutWithHeaderSidebar({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div className="main-content" style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page without header/sidebar */}
        <Route path="/" element={<Login />} />

      
        <Route
          path="/userManagement"
          element={
            <LayoutWithHeaderSidebar>
              <UserManagement />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/supperMarket"
          element={
            <LayoutWithHeaderSidebar>
              <SupperMarket />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/Payment-finance"
          element={
            <LayoutWithHeaderSidebar>
              <PaymentFinance />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/notification"
          element={
            <LayoutWithHeaderSidebar>
              <Notification />
            </LayoutWithHeaderSidebar>
          }
        />
        

      </Routes>
    </Router>
  );
};

export default App;
