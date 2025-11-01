import React, { useEffect, useState } from "react";
import './userManagement.css';
import { CiSearch } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import AddUserModal from "./AddUserModal";
import UserTable from "./userTable";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("ltr");
  const { t } = useTranslation();

  useEffect(() => {
    // Get current document direction (either 'ltr' or 'rtl')
    const getDirection = () => {
      const dir = document.documentElement.getAttribute("dir") || "ltr";
      setDirection(dir);
    };

    // Set initial direction
    getDirection();

    // Create a MutationObserver to watch for changes to the dir attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          getDirection();
        }
      });
    });

    // Start observing the document element for attribute changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`user-management-container `} >
        <div className="user-first1">
          <div className="user-management">
            <button className="right-btn">{t('customers')}</button>
            <button className="right-btn">{t('driver')}</button>
            <button className="right-btn">{t('restaurant')}</button>
          </div>
          <div className="user-second">
            <div className="input-wrapper">
              <CiSearch className="user-icon" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="user-input"
              />
            </div>
            <button className="user-btn" onClick={() => setIsModalOpen(true)}>
              + {t('addUser')}
            </button>
          </div>
        </div>
        <UserTable />
      </div>

      {isModalOpen && <AddUserModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default UserManagement; 
