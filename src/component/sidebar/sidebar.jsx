import React, { useState, useEffect, useRef } from 'react';
import { HiUsers, HiOutlineShoppingCart } from "react-icons/hi2";
import {  FaSignOutAlt, FaBars } from "react-icons/fa";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { MdOutlineNotifications } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import './sidebar.css';
// detect language direction from html tag
const isRTL = document.documentElement.getAttribute("dir") === "rtl";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Jab link pe click ho, sidebar close kar do
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="hamburger" onClick={toggleSidebar}>

        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? "open" : ""}`} ref={sidebarRef} dir={isRTL ? "rtl" : "ltr"}>


        {/* Logo */}
        <div className="sidebar-logo">

          <div className='logo-container2'>
            <img 
              src='/images/tick-box.png' 
              alt="logo" 
              className='login-logo-image2'
              loading="eager"
              decoding="sync"
            />
          </div>
          <div className='login-logo-text2'>
            <img src="/images/T3all.png" alt="" width={120} />
          </div>

        </div>

        {/* Menu */}
        <div className="sidebar-menu">

          <NavLink
            to="/userManagement"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
            style={{
              textDecoration:'None'
            }}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><HiUsers className="sidebar-icon" size={22} /></div>
              <div className='sidebar-text1'>User Management</div>
            </div>
          </NavLink>

          <NavLink
            to="/supperMarket"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><HiOutlineShoppingCart className="sidebar-icon" size={22} /></div>
              <div className='sidebar-text1'>Super Market</div>
            </div>
          </NavLink>

          <NavLink
            to="/Payment-finance"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><PiCurrencyDollarSimple  size={22}/>
              </div>
              <div className='sidebar-text1'>Payments $ finance</div>
            </div>
          </NavLink>

          <NavLink
            to="/notification"
            className={({ isActive }) => isActive ? "active-link" : ""}
            onClick={handleLinkClick}
          >
            <div className="sidebar-item">
              <div className='sidebar-icon-container'><MdOutlineNotifications className="sidebar-icon" size={24} /></div>
              <div className='sidebar-text1'>Notification</div>
            </div>
          </NavLink>
          <div className="sidebar-logout">

            {/* Logout */}
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "active-link" : ""}
              onClick={handleLinkClick}
            >
              <div className='sidebar-item2'>
                <div><FaSignOutAlt className="sidebar-icon logout-icon" size={18} /></div>
                <div className='sidebar-text1'>Logout</div>
              </div>
            </NavLink>
          </div>
        </div>


      </div>
    </>
  );
};

export default Sidebar;
