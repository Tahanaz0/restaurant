import React, { useState } from "react";
import './userManagement.css';
import { CiSearch } from "react-icons/ci";
import AddUserModal from "./AddUserModal"; // 👈 Modal import
import UserTable from "./userTable";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="user-management-container">
        <div className="user-first">
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
        <UserTable/>
      </div>

      {/* Modal call */}
      {isModalOpen && <AddUserModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default UserManagement
