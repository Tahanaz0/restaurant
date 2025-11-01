import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from 'react-i18next';
import "./addUserModal.css";

const AddUserModal = ({ onClose }) => {
  // ✅ Initialize translation hook
  const { t, i18n } = useTranslation();

  // ✅ State to store selected user type
  const [userType, setUserType] = useState(null);

  // ✅ Detect if the current language direction is RTL (like Arabic)
  const isRTL = i18n.dir() === "rtl";

  // ✅ Dropdown options (translated)
  const options = [
    { value: "Customer", label: t('customer') },
    { value: "Driver", label: t('driver') },
    { value: "Restaurant", label: t('restaurant') },
  ];

  return (
    // ✅ Apply RTL or LTR class to modal container
    <div className={`modal-overlay ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`modal-content ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* ✅ Close button */}
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>

        {/* ✅ Modal title (translated) */}
        <h2>{t('addNewUser')}</h2>

        {/* ✅ User form */}
        <form className="modal-form">

          {/* ✅ Customer name input */}
          <label>
            {t('customerName')}
            <input
              type="text"
              placeholder={t('customerNamePlaceholder')}
              dir={isRTL ? "rtl" : "ltr"} // support for RTL input
            />
          </label>

          {/* ✅ Email input */}
          <label>
            {t('email')}
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          {/* ✅ Contact input */}
          <label>
            {t('contact')}
            <input
              type="text"
              placeholder={t('contactPlaceholder')}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          {/* ✅ Address input */}
          <label>
            {t('address')}
            <input
              type="text"
              placeholder={t('addressPlaceholder')}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </label>

          {/* ✅ User Type Dropdown (using react-select) */}
          <label>
            {t('type')}
            <Select
              options={options}
              value={userType}
              onChange={setUserType}
              placeholder={t('selectType')}
              menuShouldScrollIntoView
              menuShouldBlockScroll={false}
              menuPlacement="auto"
              menuPosition="absolute"
              styles={{
                // ✅ Dropdown main input style
                control: (base) => ({
                  ...base,
                  borderColor: "#ccc",
                  borderRadius: "6px",
                  padding: "2px",
                  fontSize: "14px",
                  boxShadow: "none",
                  direction: isRTL ? "rtl" : "ltr", // adjust direction
                }),
                // ✅ Dropdown menu style
                menu: (base) => ({
                  ...base,
                  zIndex: 10000,
                  position: "absolute",
                  direction: isRTL ? "rtl" : "ltr",
                }),
                // ✅ Each option style
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f3f4f6" : "#fff",
                  color: "black",
                  cursor: "pointer",
                  textAlign: isRTL ? "right" : "left", // align text properly
                }),
              }}
            />
          </label>

          {/* ✅ Modal action buttons */}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="add-btn">
              {t('addUser')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
