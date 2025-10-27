
import React, { useRef, useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaPlus, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdOutlineGTranslate } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../store/features/translationSlice';

import './header.css';



const Header = () => {
  const location = useLocation();
  const [profilePic, setProfilePic] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.translation.language);

  useEffect(() => {
    const isRtl = ["ar", "he"].includes(i18n.language);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language || "en";
  }, [i18n.language]);
  
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

  const pageTitle = titles[location.pathname] || t('userManagement');
  const pageDescription = descriptions[location.pathname] || t('descUserManagement');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };
  const handleSelectLang = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  
    // Direction set karein
    if (lang === 'ar' || lang === 'he') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  
    setDropdownOpen(false);
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
