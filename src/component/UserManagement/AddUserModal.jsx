import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "./addUserModal.css";

// ✅ Firebase imports
import { db } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";

const AddUserModal = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // ✅ Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState(null);

  // ✅ Loader state
  const [loading, setLoading] = useState(false);

  // ✅ Dropdown options
  const options = [
    { value: "Customer", label: t("customer") },
    { value: "Driver", label: t("driver") },
    { value: "Restaurant", label: t("restaurant") },
  ];

  // ✅ Function to handle form submit and save data in Firestore
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !address || !userType) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true); // show loader

    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        contact,
        address,
        type: userType.value,
        createdAt: new Date(),
      });

      alert("User added successfully!");
      onClose(); // close modal after save
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user.");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div className={`modal-overlay ${isRTL ? "rtl" : "ltr"}`}>
      <div className={`modal-content ${isRTL ? "rtl" : "ltr"}`}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>

        <h2>{t("addNewUser")}</h2>

        <form className="modal-form" onSubmit={handleAddUser}>
          <label>
            {t("customerName")}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("customerNamePlaceholder")}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          <label>
            {t("email")}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          <label>
            {t("contact")}
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t("contactPlaceholder")}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          <label>
            {t("address")}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("addressPlaceholder")}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          <label>
            {t("type")}
            <Select
              options={options}
              value={userType}
              onChange={setUserType}
              placeholder={t("selectType")}
              menuShouldScrollIntoView
              menuShouldBlockScroll={false}
              menuPlacement="auto"
              menuPosition="absolute"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#ccc",
                  borderRadius: "6px",
                  padding: "2px",
                  fontSize: "14px",
                  boxShadow: "none",
                  direction: isRTL ? "rtl" : "ltr",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 10000,
                  position: "absolute",
                  direction: isRTL ? "rtl" : "ltr",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
                  color: "black",
                  cursor: "pointer",
                  textAlign: isRTL ? "right" : "left",
                }),
              }}
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="add-btn"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                t("addUser")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
