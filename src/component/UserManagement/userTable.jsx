// Importing necessary libraries and components
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import './userTable.css';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiTrash } from 'react-icons/fi';
import EditUserModal from './EditUserModal';

// 🟢 Firestore imports
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

const UserTable = () => {
  const { t } = useTranslation();

  // Users state (ab ye firestore se fill hoga)
  const [users, setUsers] = useState([]);

  // Dropdown and modal states
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef(null);

  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const genderOptions = [
    { value: 'Male', label: t('male') },
    { value: 'Female', label: t('female') },
    { value: 'Other', label: t('other') },
  ];
  const userTypeOptions = [
    { value: 'Admin', label: t('admin') },
    { value: 'User', label: t('user') },
    { value: 'Provider', label: t('provider') },
  ];
  const statusOptions = [
    { value: 'Active', label: t('active') },
    { value: 'Moderate', label: t('moderate') },
    { value: 'Decline', label: t('decline') },
  ];

  // 🟢 Firestore se data fetch karne ka function
  const fetchUsersFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
      console.log("Users fetched:", fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 🟢 Page load hote hi data fetch kar lo
  useEffect(() => {
    fetchUsersFromFirestore();
  }, []);

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Functions for delete/edit
  const handleDeleteUser = (indexToDelete) => {
    const updatedUsers = users.filter((_, index) => index !== indexToDelete);
    setUsers(updatedUsers);
  };
  const handleAskDelete = (index) => {
    setDeleteIndex(index);
    setOpenDropdown(null);
  };
  const handleEditUser = (index) => {
    setEditIndex(index);
    setEditUser({ ...users[index] });
    setShowEditModal(true);
    setOpenDropdown(null);
  };
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  const handleSaveEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = editUser;
    setUsers(updatedUsers);
    setShowEditModal(false);
    setEditIndex(null);
    setEditUser(null);
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditIndex(null);
    setEditUser(null);
  };
  const handleToggleDropdown = (index, event) => {
    const target = event?.currentTarget || event?.target;
    if (target && target.getBoundingClientRect) {
      const rect = target.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr className="th">
              <th><input type="checkbox" /></th>
              <th>{t('customer')}</th>
              <th>{t('email')}</th>
              <th>{t('contact')}</th>
              <th>{t('address')}</th>
              <th>{t('type')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td style={{ color: 'black' }}>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Customer"
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: document.dir === 'ltr' ? '15px' : '0',
                        marginLeft: document.dir === 'rtl' ? '15px' : '0',
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        padding: '5px',
                      }}
                    />
                  ) : null}
                  {user.name}{' '}
                  <span style={{ color: '#666', fontWeight: 'normal' }}>
                    {user.customerCode || ''}
                  </span>
                </td>
                <td style={{ color: 'black' }}>{user.email}</td>
                <td style={{ color: 'black' }}>{user.contact || user.phone || ''}</td>
                <td style={{ color: 'black' }}>{user.address || ''}</td>
                <td style={{ color: 'black' }}>{user.type || user.userType || ''}</td>

                <td className="actions-cell">
                  <span
                    className="dots"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); handleToggleDropdown(index, e); }}
                  >
                    ⋮
                  </span>

                  {openDropdown === index && (
                    <div
                      className="dropdown"
                      ref={dropdownRef}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        top: `${dropdownPosition.top}px`,
                        right: `${dropdownPosition.right}px`,
                      }}
                    >
                      <button onClick={() => handleEditUser(index)}>
                        <FiEdit /> {t('edit')}
                      </button>
                      <button onClick={() => handleAskDelete(index)}>
                        <FiTrash style={{ color: 'black' }} /> {t('delete')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditUserModal
          show={showEditModal}
          user={editUser}
          genderOptions={genderOptions}
          userTypeOptions={userTypeOptions}
          statusOptions={statusOptions}
          onChange={handleChange}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
          t={t}
        />
      )}

      {/* Delete Modal */}
      {deleteIndex !== null && (
        <div className="ud-backdrop">
          <div className="ud-modal">
            <h4>{t('deleteUserConfirm')}</h4>
            <p>{t('deleteWarning')}</p>
            <div className="ud-actions">
              <button className="ud-cancel" onClick={() => setDeleteIndex(null)}>
                {t('cancel')}
              </button>
              <button
                className="ud-confirm"
                onClick={() => {
                  handleDeleteUser(deleteIndex);
                  setDeleteIndex(null);
                }}
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
