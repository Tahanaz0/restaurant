import React, { useState } from "react";
import Select from "react-select";
import { FiX } from "react-icons/fi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"; // apni Firebase config ka path

const AddUserModal = ({
  show,
  onClose,
  t,
  genderOptions,
  userTypeOptions,
  statusOptions,
  onUserAdded, // callback to refresh users after add
}) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    userType: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (
        !newUser.name ||
        !newUser.email ||
        !newUser.phone ||
        !newUser.gender ||
        !newUser.userType ||
        !newUser.status
      ) {
        alert("Please fill all fields!");
        return;
      }

      // Default avatar & user code
      const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      const userCode = "C" + Math.floor(Math.random() * 1000 + 1)
        .toString()
        .padStart(3, "0");

      const userData = {
        ...newUser,
        image: defaultImage,
        code: userCode,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "users"), userData);

      if (onUserAdded) onUserAdded(); // refresh list
      onClose();
      setNewUser({
        name: "",
        email: "",
        phone: "",
        gender: "",
        userType: "",
        status: "",
      });

      console.log("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* ==== HEADER ==== */}
        <div className="modal-header">
          <h2>{t("addUser")}</h2>
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
              value={newUser.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>{t("emailAddress")}</label>
            <input
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>{t("phoneNo")}</label>
            <input
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              placeholder="+92..."
            />
          </div>

          <div className="form-group">
            <label>{t("gender")}</label>
            <Select
              options={genderOptions}
              value={genderOptions.find((o) => o.value === newUser.gender)}
              onChange={(selected) => handleSelectChange("gender", selected.value)}
              placeholder={t("selectGender")}
              isSearchable={false}
            />
          </div>

          <div className="form-group">
            <label>{t("userType")}</label>
            <Select
              options={userTypeOptions}
              value={userTypeOptions.find((o) => o.value === newUser.userType)}
              onChange={(selected) =>
                handleSelectChange("userType", selected.value)
              }
              placeholder={t("selectUserType")}
              isSearchable={false}
            />
          </div>

          <div className="form-group">
            <label>{t("status")}</label>
            <Select
              options={statusOptions}
              value={statusOptions.find((o) => o.value === newUser.status)}
              onChange={(selected) =>
                handleSelectChange("status", selected.value)
              }
              placeholder={t("selectStatus")}
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

export default AddUserModal;
