import React, { useEffect, useRef, useState } from 'react';
import './userTable.css';
// import UserAddForm from './UserAddForm';
import UserDelete from './UserDelete';
import { FiEdit, FiTrash, FiX, FiUser } from 'react-icons/fi';

const UserTable = () => {
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
                            <th>Customer</th>
                            <th>Email </th>
                            <th>Contact</th>
                            <th>Adress</th>
                            <th>Type</th>
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
                                            marginRight: '15px', 
                                            verticalAlign: 'middle',
                                            borderRadius: '50%'
                                        }} 
                                    />
                                    {user.name} <span style={{ color: '#666', fontWeight: 'normal' }}>{user.customerCode}</span>
                                </td>
                                <td style={{ color: 'black' }}>{user.email}</td>
                                <td style={{ color: 'black' }}>{user.phone}</td>
                                <td style={{ color: 'black' }}>{user.adress}</td>
                                <td style={{ color: 'black' }}>{user.userType}</td>

                                <td className="actions-cell">
                                    <span className="dots" onMouseDown={(e)=>e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleToggleDropdown(index, e); }}>
                                        ⋮
                                    </span>
                                    {openDropdown === index && (
                                        <div className="dropdown" ref={dropdownRef} onMouseDown={(e)=>e.stopPropagation()} onClick={(e) => e.stopPropagation()} style={{ top: `${dropdownPosition.top}px`, right: `${dropdownPosition.right}px` }}>
                                            <button onMouseDown={(e)=>e.stopPropagation()} onClick={(e) => { e.stopPropagation(); handleEditUser(index); }}>
                                                <FiEdit /> Edit
                                            </button>
                                            <button onMouseDown={(e)=>e.stopPropagation()} onClick={(e)=>{ e.stopPropagation(); handleAskDelete(index); }}>
                                                <FiTrash style={{ color: 'black' }} /> Delete
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
                            <h2>Edit User</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <FiX /> 
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={editUser.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input name="email" value={editUser.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone No</label>
                                <input name="phone" value={editUser.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" value={editUser.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>User Type</label>
                                <select name="userType" value={editUser.userType} onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Provider">Provider</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={editUser.status} onChange={handleChange}>
                                    <option value="Active">Active</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Decline">Decline</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button className="btn-save" onClick={handleSaveEdit}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="ud-backdrop">
                    <div className="ud-modal">
                        <h4>Delete this user?</h4>
                        <p>This action cannot be undone.</p>
                        <div className="ud-actions">
                            <button className="ud-confirm" onClick={() => { handleDeleteUser(deleteIndex); setDeleteIndex(null); }}>Delete</button>
                            <button className="ud-cancel" onClick={() => setDeleteIndex(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserTable;
