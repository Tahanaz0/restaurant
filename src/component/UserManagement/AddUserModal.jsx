import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from 'react-i18next';
import "./addUserModal.css";

const AddUserModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState(null);

  const options = [
    { value: "Customer", label: t('customer') },
    { value: "Driver", label: t('driver') },
    { value: "Restaurant", label: t('restaurant') },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h2>{t('addNewUser')}</h2>

        <form className="modal-form">
          <label>
            {t('customerName')}
            <input type="text" placeholder={t('customerNamePlaceholder')} />
          </label>

          <label>
            {t('email')}
            <input type="email" placeholder={t('emailPlaceholder')} />
          </label>

          <label>
            {t('contact')}
            <input type="text" placeholder={t('contactPlaceholder')} />
          </label>

          <label>
            {t('address')}
            <input type="text" placeholder={t('addressPlaceholder')} />
          </label>

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
                control: base => ({
                  ...base,
                  borderColor: "#ccc",
                  borderRadius: "6px",
                  padding: "2px",
                  fontSize: "14px",
                  boxShadow: "none",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 10000,
                  position: 'absolute'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#f3f4f6"   // hover bg (light gray/primary as you want)
                    : "#fff",     // normal
                  color: "black", // ✅ always black
                  cursor: "pointer",
                }),
              }}
            />


          </label>

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
