import React, { useState } from 'react'; 
import { HiUsers, HiOutlineShoppingCart } from "react-icons/hi2"; 
import { FaDollarSign, FaSignOutAlt, FaBars } from "react-icons/fa"; 
import { MdOutlineNotifications } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Jab link pe click ho, sidebar close kar do
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        
        {/* Logo */}
        <div className="sidebar-logo">
        
          <div className='logo-container2'>
            <img src='/images/logoo.png' alt="logo" className='login-logo-image2'  width={600}/>
          </div>
          <div className='login-logo-text2'>
            <img src="/images/T3all.png" alt="" width={100} />
          </div>
       
        </div>

        {/* Menu */}
        <div className="sidebar-menu">

          <NavLink 
            to="/userManagement" 
            className={({ isActive }) => isActive ? "active-link" : ""} 
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <HiUsers  className="sidebar-icon" />
              <span>User Management</span>
            </div>
          </NavLink>

          <NavLink 
            to="/supperMarket" 
            className={({ isActive }) => isActive ? "active-link" : ""} 
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <HiOutlineShoppingCart  className="sidebar-icon" />
              <span>Super Market</span>
            </div>
          </NavLink>

          <NavLink 
            to="/Payment-finance" 
            className={({ isActive }) => isActive ? "active-link" : ""} 
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <FaDollarSign className="sidebar-icon" />
              <span>Payments $ finance</span>
            </div>
          </NavLink>

          <NavLink 
            to="/notification" 
            className={({ isActive }) => isActive ? "active-link" : ""} 
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
            <MdOutlineNotifications  className="sidebar-icon" />
              <span>Notification</span>
            </div>
          </NavLink>

        </div>

        {/* Logout */}
        <NavLink 
          to="/logout" 
          className={({ isActive }) => isActive ? "active-link" : ""} 
          onClick={handleLinkClick}
        >
          <div className="sidebar-logout">
            <FaSignOutAlt className="sidebar-icon logout-icon" />
            <span>Logout</span>
          </div>
        </NavLink>

      </div>
    </>
  );
};

export default Sidebar;
