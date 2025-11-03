import React, { useRef, useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaPlus, FaUser } from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { MdOutlineGTranslate } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../store/features/translationSlice';

import './header.css';
import CheckOutBtn from '../checkOut/check_out_btn';

const Header = () => {
  // ✅ Get current route using React Router
  const location = useLocation();

  // ✅ Local states
  const [profilePic, setProfilePic] = useState(null); // Store uploaded profile picture
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle language dropdown

  // ✅ Reference for file input (used to trigger file upload)
  const fileInputRef = useRef(null);

  // ✅ i18next for translations and Redux for managing language state
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.translation.language);

  // ✅ Apply RTL (Right-to-Left) direction dynamically based on selected language
  useEffect(() => {
    const isRtl = ["ar", "he"].includes(i18n.language);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);

  // ✅ Page titles and descriptions (translated dynamically)
  const titles = {
    "/userManagement": t('userManagement'),
    "/supperMarket": t('supermarket'),
    "/Payment-finance": t('payments'),
    "/notification": t('notification'),
    "/logout": t('logout')
  };

  const descriptions = {
    "/userManagement": t('descUserManagement'),
    "/supperMarket": t('descSuperMarket'),
    "/Payment-finance": t('descPayments'),
    "/notification": t('descNotification'),
    "/logout": t('descLogout')
  };

  // ✅ Select current page title and description
  const pageTitle = titles[location.pathname] || t('userManagement');
  const pageDescription = descriptions[location.pathname] || t('descUserManagement');

  // ✅ Handle profile image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the uploaded image
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // ✅ Handle language change (updates Redux + i18next + page direction)
  const handleSelectLang = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);

    // Update direction for RTL languages
    if (lang === 'ar' || lang === 'he') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }

    // Close dropdown after selection
    setDropdownOpen(false);
  };

  return (
    <div className='header-container'>
      <div className='header-left'>
        {/* ✅ Page title and description (auto-updated with route) */}
        <div className="header-title">
          {pageTitle}
          <p className="header-description">{pageDescription}</p>
        </div>

        {/* ✅ Header right-side icons and profile */}
        <div className='header-right'>
          <CheckOutBtn />

          {/* 🔔 Notification Icon */}
          <NavLink to='/notification'>
            <div>
              <IoNotifications
                size={25}
                style={{ color: 'GrayText' }}
              />
            </div>
          </NavLink>

          {/* 🌐 Language Dropdown */}
          <div className="dropdown-container">
            {/* Translate icon toggles the dropdown */}
            <div
              className="translate-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <MdOutlineGTranslate size={25} />
            </div>

            {/* Dropdown Menu (appears when open) */}
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'ar', label: 'Arabic' },
                  { code: 'he', label: 'Hebrew' }
                ].map((lang) => (
                  <li
                    key={lang.code}
                    className="dropdown-item"
                    onClick={() => handleSelectLang(lang.code)}
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 👤 Profile Section */}
          <div
            className="profile-circle"
            onClick={() => fileInputRef.current.click()} // Opens hidden file input
          >
            {/* If profile picture exists, show it; otherwise show icon */}
            {profilePic ? (
              <img src={profilePic} alt="profile" className="profile-pic" />
            ) : (
              <FaUser className="profile-placeholder" />
            )}

            {/* ➕ Small add icon overlay */}
            <div className="add-icon">
              <FaPlus size={12} />
            </div>

            {/* Hidden File Input */}
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
