import React from "react";
import "./addUserModal.css";

const AddUserModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New User</h2>

        <form className="modal-form">
          <label>
            Customer Name
            <input type="text" placeholder="John Doe" />
          </label>

          <label>
            Email
            <input type="email" placeholder="john@example.com" />
          </label>

          <label>
            Contact
            <input type="text" placeholder="+92 300 1234567" />
          </label>

          <label>
            Address
            <input type="text" placeholder="Lahore, Pakistan" />
          </label>

          <label>
            Type
            <select>
              <option>Customer</option>
              <option>Driver</option>
              <option>Restaurant</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
