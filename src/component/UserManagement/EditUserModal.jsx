import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Select from "react-select";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed

const EditUserModal = ({
  show,
  user,
  onClose,
  t,
  userTypeOptions,
  onUserUpdated, // callback to refresh list after edit
}) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  if (!show || !editedUser) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSelectChange = (selected) => {
    setEditedUser({ ...editedUser, userType: selected.value });
  };

  const handleSave = async () => {
    if (
      !editedUser.name ||
      !editedUser.email ||
      !editedUser.phone ||
      !editedUser.address
    ) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const userRef = doc(db, "users", editedUser.id);
      await updateDoc(userRef, {
        name: editedUser.name,
        email: editedUser.email,
        phone: editedUser.phone,
        address: editedUser.address,
        userType: editedUser.userType,
      });

      console.log("✅ User updated in Firestore!");
      if (onUserUpdated) onUserUpdated(); // refresh list
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* ==== HEADER ==== */}
        <div className="modal-header">
          <h2>{t("editUser")}</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* ==== BODY ==== */}
        <div className="modal-body">
          <div className="form-group">
            <label>{t("name")}</label>
            <input
              name="name"
              value={editedUser.name || ""}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>{t("emailAddress")}</label>
            <input
              name="email"
              value={editedUser.email || ""}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>{t("phoneNo")}</label>
            <input
              name="phone"
              value={editedUser.phone || ""}
              onChange={handleChange}
              placeholder="+92..."
            />
          </div>

          <div className="form-group">
            <label>{t("address")}</label>
            <input
              name="address"
              value={editedUser.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="form-group">
            <label>{t("userType")}</label>
            <Select
              options={userTypeOptions}
              value={userTypeOptions.find(
                (opt) => opt.value === editedUser.userType
              )}
              onChange={handleSelectChange}
              placeholder={t("selectUserType")}
              isSearchable={false}
            />
          </div>
        </div>

        {/* ==== FOOTER ==== */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            {t("cancel")}
          </button>
          <button className="btn-save" onClick={handleSave}>
            {t("saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
