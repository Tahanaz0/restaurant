// Import required libraries and components
import React from 'react';
import Select from 'react-select'; // Dropdown component for select fields
import { FiX } from 'react-icons/fi'; // Close icon for modal header

// EditUserModal Component - displays a modal to edit user information
const EditUserModal = ({
  show,               // Boolean - controls whether modal is visible or not
  user,               // Object - user data to be edited
  genderOptions,      // Dropdown options for gender
  userTypeOptions,    // Dropdown options for user type
  statusOptions,      // Dropdown options for account status
  onChange,           // Function - handles input/select field changes
  onSave,             // Function - called when user saves changes
  onClose,            // Function - closes the modal
  t                   // Translation function from i18next
}) => {

  // If modal should not be shown or user data is missing, render nothing
  if (!show || !user) return null;

  return (
    // Overlay covers entire screen when modal is open
    <div className="modal-overlay">
      <div className="modal">
        {/* ==== MODAL HEADER ==== */}
        <div className="modal-header">
          <h2>{t('editUser')}</h2>
          {/* Close button to hide modal */}
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* ==== MODAL BODY ==== */}
        <div className="modal-body">
          {/* Name input field */}
          <div className="form-group">
            <label>{t('name')}</label>
            <input name="name" value={user.name} onChange={onChange} />
          </div>

          {/* Email input field */}
          <div className="form-group">
            <label>{t('emailAddress')}</label>
            <input name="email" value={user.email} onChange={onChange} />
          </div>

          {/* Phone number input field */}
          <div className="form-group">
            <label>{t('phoneNo')}</label>
            <input name="phone" value={user.phone} onChange={onChange} />
          </div>

          {/* ==== Gender dropdown ==== */}
          <div className="form-group">
            <label>{t('gender')}</label>
            <Select
              options={genderOptions}
              value={genderOptions.find(o => o.value === user.gender)}
              onChange={selected =>
                onChange({ target: { name: 'gender', value: selected.value } })
              }
              isSearchable={false}
              placeholder={t('selectGender')}
              menuPosition="absolute"
              menuShouldBlockScroll={false}
              menuPlacement="auto"
              // Custom styling for Select component
              styles={{
                menu: base => ({ ...base, zIndex: 10000, position: 'absolute' }),
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#2F985A' : '#ccc',
                  borderRadius: '6px',
                  padding: '2px',
                  fontSize: '14px',
                  boxShadow: 'none',
                }),
                menuList: base => ({ ...base, maxHeight: 180, overflowY: 'auto' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#e5e7eb'
                    : state.isFocused
                    ? '#f3f4f6'
                    : '#fff',
                  color: '#111827',
                }),
              }}
              // Theme customization for Select
              theme={theme => ({
                ...theme,
                colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
              })}
            />
          </div>

          {/* ==== User Type dropdown ==== */}
          <div className="form-group">
            <label>{t('userType')}</label>
            <Select
              options={userTypeOptions}
              value={userTypeOptions.find(o => o.value === user.userType)}
              onChange={selected =>
                onChange({ target: { name: 'userType', value: selected.value } })
              }
              isSearchable={false}
              placeholder={t('selectUserType')}
              menuPosition="absolute"
              menuShouldBlockScroll={false}
              menuPlacement="auto"
              styles={{
                menu: base => ({ ...base, zIndex: 10000, position: 'absolute' }),
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#2F985A' : '#ccc',
                  borderRadius: '6px',
                  padding: '2px',
                  fontSize: '14px',
                  boxShadow: 'none',
                }),
                menuList: base => ({ ...base, maxHeight: 180, overflowY: 'auto' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#e5e7eb'
                    : state.isFocused
                    ? '#f3f4f6'
                    : '#fff',
                  color: '#111827',
                }),
              }}
              theme={theme => ({
                ...theme,
                colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
              })}
            />
          </div>

          {/* ==== Status dropdown ==== */}
          <div className="form-group">
            <label>{t('status')}</label>
            <Select
              options={statusOptions}
              value={statusOptions.find(o => o.value === user.status)}
              onChange={selected =>
                onChange({ target: { name: 'status', value: selected.value } })
              }
              isSearchable={false}
              placeholder={t('selectStatus')}
              menuPosition="absolute"
              menuShouldBlockScroll={false}
              menuPlacement="auto"
              styles={{
                menu: base => ({ ...base, zIndex: 10000, position: 'absolute' }),
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#2F985A' : '#ccc',
                  borderRadius: '6px',
                  padding: '2px',
                  fontSize: '14px',
                  boxShadow: 'none',
                }),
                menuList: base => ({ ...base, maxHeight: 180, overflowY: 'auto' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#e5e7eb'
                    : state.isFocused
                    ? '#f3f4f6'
                    : '#fff',
                  color: '#111827',
                }),
              }}
              theme={theme => ({
                ...theme,
                colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
              })}
            />
          </div>
        </div>

        {/* ==== MODAL FOOTER ==== */}
        <div className="modal-footer">
          {/* Cancel button closes modal without saving */}
          <button className="btn-cancel" onClick={onClose}>
            {t('cancel')}
          </button>

          {/* Save button applies user changes */}
          <button className="btn-save" onClick={onSave}>
            {t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
