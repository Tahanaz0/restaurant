import React from 'react';
import { IoNotifications } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import './header.css'

const Header = () => {
    const location = useLocation();

    // Path → Title mapping
    const titles = {
        "/userManagement": "User Management",
        "/supperMarket": "Super Market",
        "/Payment-finance": "Payments & Finance",
        "/notification": "Notification",
        "/logout": "Logout"
    };

    // Path → Description mapping
    const descriptions = {
        "/userManagement": "Manage all the users and their access in the system.",
        "/supperMarket": "Track and manage supermarket operations easily.",
        "/Payment-finance": "Handle payments, invoices, and finance related tasks.",
        "/notification": "Check and respond to all notifications here.",
        "/logout": "You can logout securely from here."
    };

    // Agar path mapping me ho to use lo, warna default dikhado
    const pageTitle = titles[location.pathname] || "User Management";
    const pageDescription = descriptions[location.pathname] || "Manage all the users and their access in the system.";

    return (
        <div className='header-container'>
            <div className='header-left'>
                <div className="header-title">
                    {pageTitle}
                    <p className="header-description">{pageDescription}</p>
                </div>
                <div className='header-right'>
                    <div>
                        <IoNotifications />
                    </div>
                    <div>
                        <img src='./images/icon.png' alt="user" />
                    </div>
                    <div>
                        <img src='./images/fram.png' alt="user" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
