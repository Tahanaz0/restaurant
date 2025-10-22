import React, { useEffect, useState } from "react";
import './userManagement.css';
import { CiSearch } from "react-icons/ci";
import AddUserModal from "./AddUserModal";
import UserTable from "./userTable";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("ltr");

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
      <div className={`user-management-container `} style={{ width: direction === "ltr" ? "93%" : "92%" }}>
        <div className="user-first1">
          <div className="user-management">
            <button className="right-btn">Customers</button>
            <button className="right-btn">Driver</button>
            <button className="right-btn">Restaurant</button>
          </div>
          <div className="user-second">
            <div className="input-wrapper">
              <CiSearch className="user-icon" />
              <input
                type="text"
                placeholder="Search by name email or phone..."
                className="user-input"
              />
            </div>
            <button className="user-btn" onClick={() => setIsModalOpen(true)}>
              + Add user
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
