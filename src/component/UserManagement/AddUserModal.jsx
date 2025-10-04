import React, { useState } from "react";
import Select from "react-select";
import "./addUserModal.css";

const AddUserModal = ({ onClose }) => {
  const [userType, setUserType] = useState(null);

  const options = [
    { value: "Customer", label: "Customer" },
    { value: "Driver", label: "Driver" },
    { value: "Restaurant", label: "Restaurant" },
  ];

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
            <Select
              options={options}
              value={userType}
              onChange={setUserType}
              placeholder="Select type"
              menuPortalTarget={document.body} // ✅ dropdown modal ke bahar render hoga
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }), // ✅ ensure top layer
                control: base => ({
                  ...base,
                  borderColor: "#ccc",
                  borderRadius: "6px",
                  padding: "2px",
                  fontSize: "14px",
                  boxShadow: "none",
                }),
              }}
            />
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
