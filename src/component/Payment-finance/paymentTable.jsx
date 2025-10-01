import React, { useEffect, useRef, useState } from 'react';
import './paymentTable.css';

const statusStyles = {
    Pending: { background: '#FEF3C7', color: '#92400e' },
    Completed: { background: '#D1FAE5', color: '#065F46' }
};

function StatusBadge({ status }) {
    const style = statusStyles[status] || { background: '#e5e7eb', color: '#374151' };
    return (
        <span style={{
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'inline-block',
            ...style
        }}>
            {status}
        </span>
    );
}

const PaymentTable = () => {
    const [rows, setRows] = useState([
        { id: 1, user: 'Alex Rodriguez', type: 'Delivery', earnings: 1062.92, status: 'Pending', time: 'Week 1 - Jan 2024' },
        { id: 2, user: 'Sarah Wilson', type: 'Taxi', earnings: 2106.72, status: 'Completed', time: 'Week 1 - Jan 2024' },
        { id: 3, user: 'Tom Brown', type: 'Delivery', earnings: 756.71, status: 'Pending', time: 'Week 1 - Jan 2024' },
        { id: 4, user: 'Alex Rodriguez', type: 'Delivery', earnings: 1062.92, status: 'Pending', time: 'Week 1 - Jan 2024' },
        { id: 5, user: 'Sarah Wilson', type: 'Taxi', earnings: 2106.72, status: 'Completed', time: 'Week 1 - Jan 2024' },
        { id: 6, user: 'Tom Brown', type: 'Delivery', earnings: 756.71, status: 'Pending', time: 'Week 1 - Jan 2024' }
    ]);

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAskDelete = (row) => {
        setDeleteId(row.id);
        setOpenMenuIndex(null);
    };

    const handleConfirmDelete = () => {
        setRows((prev) => prev.filter((row) => row.id !== deleteId));
        setDeleteId(null);
    };

    const handleEdit = (row) => {
        setEditRow({ ...row });
        setOpenMenuIndex(null);
    };

    const handleSaveEdit = () => {
        setRows(prev => prev.map(r => r.id === editRow.id ? editRow : r));
        setEditRow(null);
    };

    return (
        <div className="payment-table-container">
            <h3 style={{ margin: '10px 0 6px 10px', fontWeight: 700 }}>Payment History</h3>
            <table className="payment-table">
                <thead>
                    <tr className="th">
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>User Name</th>
                        <th>Type</th>
                        <th>Total Earnings</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={row.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td style={{ color: 'black' }}>{row.user}</td>
                            <td style={{ color: 'black' }}>{row.type}</td>
                            <td style={{ color: 'black' }}>{`$${row.earnings}`}</td>
                            <td><StatusBadge status={row.status} /></td>
                            <td style={{ color: 'black' }}>{row.time}</td>
                            <td className="actions-cell" style={{ position: 'relative' }}>
                                <span
                                    className="dots"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const rect = e.target.getBoundingClientRect();
                                        setDropdownPosition({
                                            top: rect.bottom + window.scrollY + 5,
                                            right: window.innerWidth - rect.right - window.scrollX
                                        });
                                        setOpenMenuIndex(openMenuIndex === idx ? null : idx);
                                    }}
                                >
                                    ⋮
                                </span>

                                {openMenuIndex === idx && (
                                    <div 
                                        ref={menuRef} 
                                        className="dropdown"
                                        style={{
                                            top: `${dropdownPosition.top}px`,
                                            right: `${dropdownPosition.right}px`
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(row);
                                            }} 
                                            className="dropdown-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAskDelete(row);
                                            }} 
                                            className="dropdown-btn delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete confirm modal */}
            {deleteId !== null && (
                <div className="ud-backdrop">
                    <div className="ud-modal">
                        <h4>Delete this record?</h4>
                        <p>This action cannot be undone.</p>
                        <div className="ud-actions">
                            <button className="ud-confirm" onClick={handleConfirmDelete}>Delete</button>
                            <button className="ud-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit modal */}
            {editRow && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Edit Payment</h3>
                            <button className="close-btn" onClick={() => setEditRow(null)}>×</button>
                        </div>
                        <div className="modal-body addd-form">
                            <div className="form-group">
                                <label>User Name</label>
                                <input value={editRow.user} onChange={(e) => setEditRow({ ...editRow, user: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <input value={editRow.type} onChange={(e) => setEditRow({ ...editRow, type: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Total Earnings</label>
                                <input type="number" value={editRow.earnings} onChange={(e) => setEditRow({ ...editRow, earnings: Number(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={editRow.status} onChange={(e) => setEditRow({ ...editRow, status: e.target.value })}>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input value={editRow.time} onChange={(e) => setEditRow({ ...editRow, time: e.target.value })} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setEditRow(null)}>Cancel</button>
                            <button className="btn-save" onClick={handleSaveEdit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentTable;
