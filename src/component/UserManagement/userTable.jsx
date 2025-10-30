import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import './userTable.css';
import { useTranslation } from 'react-i18next';
// import UserAddForm from './UserAddForm';
import { FiEdit, FiTrash, FiX, FiUser } from 'react-icons/fi';

const UserTable = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([
        {
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
            userType: 'Cutomer',
            image: '/images/mike.png',
            customerCode: 'C005',
        },
        {
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
        },
    ]);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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

    return (
        <>
            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr className="th">
                            <th>
                                <input type="checkbox" />
                            </th>
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
                                <td>
                                    <input type="checkbox" />
                                </td>
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
                                    {user.name} <span style={{ color: '#666', fontWeight: 'normal' }}>{user.customerCode}</span>
                                </td>
                                <td style={{ color: 'black' }}>{user.email}</td>
                                <td style={{ color: 'black' }}>{user.phone}</td>
                                <td style={{ color: 'black' }}>{t(user.adress.toLowerCase())}</td>
                                <td style={{ color: 'black' }}>{t(user.userType.toLowerCase())}</td>

                                <td className="actions-cell">
                                    <span className="dots" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleToggleDropdown(index, e); }}>
                                        ⋮
                                    </span>
                                    {openDropdown === index && (
                                        <div className="dropdown" ref={dropdownRef} onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} style={{ top: `${dropdownPosition.top}px`, right: `${dropdownPosition.right}px` }}>
                                            <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleEditUser(index); }}>
                                                <FiEdit /> {t('edit')}
                                            </button>
                                            <button onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleAskDelete(index); }}>
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

            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>{t('editUser')}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>{t('name')}</label>
                                <input name="name" value={editUser.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>{t('emailAddress')}</label>
                                <input name="email" value={editUser.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>{t('phoneNo')}</label>
                                <input name="phone" value={editUser.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>{t('gender')}</label>
                                <Select
                                    options={genderOptions}
                                    value={genderOptions.find(o => o.value === editUser.gender)}
                                    onChange={(selected) => setEditUser({ ...editUser, gender: selected.value })}
                                    isSearchable={false}
                                        placeholder={t('selectGender')}
                                        menuPosition="absolute"
                                        menuShouldBlockScroll={false}
                                        menuPlacement="auto"
                                    styles={{
                                            menu: (base) => ({ ...base, zIndex: 10000, position: 'absolute' }),
                                        control: (base, state) => ({
                                            ...base,
                                            borderColor: state.isFocused ? '#2F985A' : '#ccc',
                                            borderRadius: '6px',
                                            padding: '2px',
                                            fontSize: '14px',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            maxHeight: 180,
                                            overflowY: 'auto',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? '#e5e7eb' : (state.isFocused ? '#f3f4f6' : '#fff'),
                                            color: '#111827',
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('userType')}</label>
                                <Select
                                    options={userTypeOptions}
                                    value={userTypeOptions.find(o => o.value === editUser.userType)}
                                    onChange={(selected) => setEditUser({ ...editUser, userType: selected.value })}
                                    isSearchable={false}
                                        placeholder={t('selectUserType')}
                                        menuPosition="absolute"
                                        menuShouldBlockScroll={false}
                                        menuPlacement="auto"
                                    styles={{
                                            menu: (base) => ({ ...base, zIndex: 10000, position: 'absolute' }),
                                        control: (base, state) => ({
                                            ...base,
                                            borderColor: state.isFocused ? '#2F985A' : '#ccc',
                                            borderRadius: '6px',
                                            padding: '2px',
                                            fontSize: '14px',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            maxHeight: 180,
                                            overflowY: 'auto',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? '#e5e7eb' : (state.isFocused ? '#f3f4f6' : '#fff'),
                                            color: '#111827',
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('status')}</label>
                                <Select
                                    options={statusOptions}
                                    value={statusOptions.find(o => o.value === editUser.status)}
                                    onChange={(selected) => setEditUser({ ...editUser, status: selected.value })}
                                    isSearchable={false}
                                        placeholder={t('selectStatus')}
                                        menuPosition="absolute"
                                        menuShouldBlockScroll={false}
                                        menuPlacement="auto"
                                    styles={{
                                            menu: (base) => ({ ...base, zIndex: 10000, position: 'absolute' }),
                                        control: (base, state) => ({
                                            ...base,
                                            borderColor: state.isFocused ? '#2F985A' : '#ccc',
                                            borderRadius: '6px',
                                            padding: '2px',
                                            fontSize: '14px',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            maxHeight: 180,
                                            overflowY: 'auto',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? '#e5e7eb' : (state.isFocused ? '#f3f4f6' : '#fff'),
                                            color: '#111827',
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: { ...theme.colors, primary25: '#f3f4f6', primary: '#2F985A' },
                                    })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={handleCloseModal}>
                                {t('cancel')}
                            </button>
                            <button className="btn-save" onClick={handleSaveEdit}>
                                {t('saveChanges')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="ud-backdrop">
                    <div className="ud-modal">
                        <h4>{t('deleteUserConfirm')}</h4>
                        <p>{t('deleteWarning')}</p>
                        <div className="ud-actions">
                            <button className="ud-cancel" onClick={() => setDeleteIndex(null)}>{t('cancel')}</button>
                            <button className="ud-confirm" onClick={() => { handleDeleteUser(deleteIndex); setDeleteIndex(null); }}>{t('delete')}</button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserTable;
