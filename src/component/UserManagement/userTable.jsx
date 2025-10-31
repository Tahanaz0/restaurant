// Importing necessary libraries and components
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select'; // For dropdown/select components (currently unused in this file)
import './userTable.css'; // Styling for the table
import { useTranslation } from 'react-i18next'; // For multi-language support (i18n)
import { FiEdit, FiTrash } from 'react-icons/fi'; // Icons for edit and delete actions
import EditUserModal from './EditUserModal'; // Separate component for editing user details

const UserTable = () => {
    // Translation function from i18next
    const { t } = useTranslation();

    // State for storing list of users
    const [users, setUsers] = useState([{
        name: 'John',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/john.png',
        customerCode: 'C001',
    },
    {
        name: 'Jane',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/jane.png',
        customerCode: 'C002',
    },
    {
        name: 'John',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/john.png',
        customerCode: 'C003',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C004',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer', image: '/images/mike.png', customerCode: 'C005',
    }, {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C006',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C007',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C008',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C009',
    },
    {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        phone: '+92 123456789',
        adress: 'Male',
        userType: 'Cutomer',
        image: '/images/mike.png',
        customerCode: 'C010',
    },]);

    // Dropdown and modal state variables
    const [openDropdown, setOpenDropdown] = useState(null); // Tracks which user's action menu is open
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 }); // Dynamic position for dropdown
    const dropdownRef = useRef(null); // Reference for dropdown to detect clicks outside

    const [editIndex, setEditIndex] = useState(null); // Index of the user being edited
    const [editUser, setEditUser] = useState(null); // Stores selected user data for editing
    const [showEditModal, setShowEditModal] = useState(false); // Toggles edit modal visibility
    const [deleteIndex, setDeleteIndex] = useState(null); // Index of the user selected for delete confirmation

    // Dropdown options for edit modal form fields
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

    // Handles toggling dropdown visibility and calculates its position
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

    // Detects clicks outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Handles actual deletion of user from the list
    const handleDeleteUser = (indexToDelete) => {
        const updatedUsers = users.filter((_, index) => index !== indexToDelete);
        setUsers(updatedUsers);
    };

    // Opens delete confirmation modal
    const handleAskDelete = (index) => {
        setDeleteIndex(index);
        setOpenDropdown(null);
    };

    // Opens edit modal and loads user data into form
    const handleEditUser = (index) => {
        setEditIndex(index);
        setEditUser({ ...users[index] });
        setShowEditModal(true);
        setOpenDropdown(null);
    };

    // Updates form input changes inside edit modal
    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    // Saves updated user data back to list
    const handleSaveEdit = () => {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = editUser;
        setUsers(updatedUsers);
        setShowEditModal(false);
        setEditIndex(null);
        setEditUser(null);
    };

    // Closes edit modal without saving
    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditIndex(null);
        setEditUser(null);
    };

    return (
        <>
            {/* ==== USER TABLE SECTION ==== */}
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
                        {/* Mapping through users array to display each user's data */}
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>

                                {/* Customer name + image + code */}
                                <td style={{ color: 'black' }}>
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
                                    {user.name}{' '}
                                    <span style={{ color: '#666', fontWeight: 'normal' }}>
                                        {user.customerCode}
                                    </span>
                                </td>

                                {/* User info columns */}
                                <td style={{ color: 'black' }}>{user.email}</td>
                                <td style={{ color: 'black' }}>{user.phone}</td>
                                <td style={{ color: 'black' }}>{t(user.adress.toLowerCase())}</td>
                                <td style={{ color: 'black' }}>{t(user.userType.toLowerCase())}</td>

                                {/* Actions column (Edit/Delete dropdown) */}
                                <td className="actions-cell">
                                    <span
                                        className="dots"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => { e.stopPropagation(); handleToggleDropdown(index, e); }}
                                    >
                                        ⋮
                                    </span>

                                    {/* Dropdown menu for Edit/Delete */}
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

            {/* ==== EDIT USER MODAL ==== */}
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

            {/* ==== DELETE CONFIRMATION MODAL ==== */}
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
