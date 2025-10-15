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
            <img src='/images/logoo.png' alt="logo" className='login-logo-image2' width={600} />
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
              <div className='sidebar-icon-container'><HiUsers className="sidebar-icon" size={22}/></div>
              <div className='sidebar-text1'>User Management</div>
            </div>
          </NavLink>

          <NavLink
            to="/supperMarket"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><HiOutlineShoppingCart className="sidebar-icon" size={22}/></div>
              <div className='sidebar-text1'>Super Market</div>
            </div>
          </NavLink>

          <NavLink
            to="/Payment-finance"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><FaDollarSign  size={22}/></div>
              <div className='sidebar-text1'>Payments $ finance</div>
            </div>
          </NavLink>

          <NavLink
            to="/notification"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><MdOutlineNotifications className="sidebar-icon" size={24}/></div>
              <div className='sidebar-text1'>Notification</div>
            </div>
          </NavLink>

        </div>
        <div  className="sidebar-logout">

          {/* Logout */}
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className='sidebar-item2'>
              <div><FaSignOutAlt className="sidebar-icon logout-icon" size={20} /></div>
              <div className='sidebar-text1'>Logout</div>
            </div>
          </NavLink>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
