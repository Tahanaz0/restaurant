import React, { useRef, useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaPlus, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdOutlineGTranslate } from "react-icons/md";
import { NavLink } from 'react-router-dom';

import './header.css';

const translations = {
  English: {
    userManagement: "User Management",
    supermarket: "Super Market",
    payments: "Payments & Finance",
    notification: "Notification",
    logout: "Logout",
    descUserManagement: "Manage all the users and their access in the system.",
    descSuperMarket: "Track and manage supermarket operations easily.",
    descPayments: "Handle payments, invoices, and finance related tasks.",
    descNotification: "Check and respond to all notifications here.",
    descLogout: "You can logout securely from here."
  },
  Arabic: {
    userManagement: "إدارة المستخدم",
    supermarket: "سوبر ماركت",
    payments: "المدفوعات والتمويل",
    notification: "إشعار",
    logout: "تسجيل الخروج",
    descUserManagement: "إدارة جميع المستخدمين وصلاحياتهم في النظام.",
    descSuperMarket: "تتبع وإدارة عمليات السوبر ماركت بسهولة.",
    descPayments: "إدارة المدفوعات والفواتير والمهام المالية.",
    descNotification: "تحقق من جميع الإشعارات والرد عليها هنا.",
    descLogout: "يمكنك تسجيل الخروج بأمان من هنا."
  },
  Hebrew: {
    userManagement: "ניהול משתמשים",
    supermarket: "סופרמרקט",
    payments: "תשלומים ופיננסים",
    notification: "התראה",
    logout: "התנתקות",
    descUserManagement: "נהל את כל המשתמשים והגישה שלהם במערכת.",
    descSuperMarket: "עקוב ונהל בקלות את פעולות הסופרמרקט.",
    descPayments: "טפל בתשלומים, חשבוניות ומשימות פיננסיות.",
    descNotification: "בדוק והגב לכל ההתראות כאן.",
    descLogout: "באפשרותך להתנתק בצורה מאובטחת מכאן."
  }
};


const Header = () => {
  const location = useLocation();
  const [profilePic, setProfilePic] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English"); // default lang
  const fileInputRef = useRef(null);

  const pageKey = location.pathname.replace("/", ""); // route ka key banane ke liye

const pageTitle =
  translations[selectedLang]?.[pageKey] || translations[selectedLang].userManagement;

const pageDescription =
  translations[selectedLang]?.["desc" + pageKey.charAt(0).toUpperCase() + pageKey.slice(1)] ||
  translations[selectedLang].descUserManagement;


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    setDropdownOpen(false);
  
    if (lang === "Arabic" || lang === "Hebrew") {
      document.body.setAttribute("dir", "rtl"); // Right to Left
    } else {
      document.body.setAttribute("dir", "ltr"); // Left to Right (default)
    }
  };
  

  return (
    <div className='header-container'>
      <div className='header-left'>
        <div className="header-title">
          {pageTitle}
          <p className="header-description">{pageDescription}</p>
        </div>

        <div className='header-right'>
          {/* Notification */}
          <NavLink to='/notification'>
          <div>
            <IoNotifications size={25}  style={{
                color:'GrayText'
            }}/>
          </div>
          </NavLink>

          {/* Translate Dropdown */}
          <div className="dropdown-container">
            <div 
              className="translate-icon" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <MdOutlineGTranslate size={25} />
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {["English", "Arabic", "Hebrew"].map((lang) => (
                  <li 
                    key={lang} 
                    className="dropdown-item" 
                    onClick={() => handleSelectLang(lang)}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Profile */}
          <div 
            className="profile-circle" 
            onClick={() => fileInputRef.current.click()}
          >
            {profilePic ? (
              <img src={profilePic} alt="profile" className="profile-pic" />
            ) : (
              <FaUser className="profile-placeholder" />
            )}

            <div className="add-icon">
              <FaPlus size={12} />
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden-input"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
