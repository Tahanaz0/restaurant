import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import './MarketTable.css';

const statusStyles = {
    Preparing: { background: '#fde68a', color: '#92400e' },
    Pending: { background: '#e5e7eb', color: '#374151' },
    'Out for Delivery': { background: '#bfdbfe', color: '#1e3a8a' }
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

const MarketTable = () => {
    const [items, setItems] = useState([
        { id: 'IT-001', name: 'Margherita Pizza', category: 'Pizza', price: 12.75, stock: 0, restaurant: 'Pizza Palace', status: 'Preparing' },
        { id: 'IT-002', name: 'Chicken Burger', category: 'Burger', price: 24.3, stock: 15, restaurant: 'Burger House', status: 'Pending' },
        { id: 'IT-003', name: 'California Roll', category: 'Burger', price: 24.3, stock: 20, restaurant: 'Sushi Zen', status: 'Out for Delivery' },
        { id: 'IT-004', name: 'Pepperoni Pizza', category: 'Sushi', price: 24.3, stock: 30, restaurant: 'Pizza Palace', status: 'Preparing' },
        { id: 'IT-005', name: 'Pad Thai', category: 'Thai', price: 32.75, stock: 8, restaurant: 'Thai Garden', status: 'Pending' },
        { id: 'IT-006', name: 'Beef Burger', category: 'Burger', price: 67.3, stock: 18, restaurant: 'Burger House', status: 'Out for Delivery' },
        { id: 'IT-007', name: 'Chicken Alfredo', category: 'Mexican', price: 45.5, stock: 0, restaurant: 'Italian Bistro', status: 'Preparing' },
        { id: 'IT-008', name: 'Fish Tacos', category: 'Mexican', price: 32.75, stock: 12, restaurant: 'Mexican Grill', status: 'Pending' },
    ]);

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [editItem, setEditItem] = useState(null);
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

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((row) => row.id !== id));
        setOpenMenuIndex(null);
    };

    const handleOpenEdit = (item) => {
        setEditItem({ ...item });
        setOpenMenuIndex(null);
    };

    const handleSaveEdit = () => {
        setItems(prev => prev.map(it => it.id === editItem.id ? editItem : it));
        setEditItem(null);
    };

    return (
        <div className="market-table-container">
            <table className="market-table">
                    <thead>
                        <tr className="th">
                            <th>
                                <input type="checkbox" />
                            </th>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Restaurant</th>
                        <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item, idx) => (
                        <tr key={item.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                            <td style={{ color: 'black', fontWeight: 700 }}>{item.id}</td>
                            <td style={{ color: 'black' }}>{item.name}</td>
                            <td style={{ color: 'black' }}>{item.category}</td>
                            <td style={{ color: 'black' }}>{`$${item.price}`}</td>
                            <td style={{ color: 'black' }}>{item.stock}</td>
                            <td style={{ color: 'black' }}>{item.restaurant}</td>
                            <td><StatusBadge status={item.status} /></td>
                            <td className="actions-cell" style={{ position: 'relative' }}>
                                <span className="dots" style={{ cursor: 'pointer' }} onClick={() => setOpenMenuIndex(openMenuIndex === idx ? null : idx)}>⋮</span>
                                {openMenuIndex === idx && (
                                    <div ref={menuRef} style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '24px',
                                        background: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        overflow: 'hidden',
                                        zIndex: 10,
                                        minWidth: '130px'
                                    }}>
                                        <button onClick={() => { handleOpenEdit(item); }} style={{
                                            width: '100%',
                                            background: 'transparent',
                                            border: 'none',
                                            textAlign: 'left',
                                            padding: '10px 12px',
                                            cursor: 'pointer',
                                            color: '#111827'
                                        }}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} style={{
                                            width: '100%',
                                            background: 'transparent',
                                            border: 'none',
                                            textAlign: 'left',
                                            padding: '10px 12px',
                                            cursor: 'pointer',
                                            color: '#b91c1c'
                                        }}>Delete</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editItem && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Edit Item</h3>
                                <button className="close-btn" onClick={() => setEditItem(null)}>×</button>
                            </div>
                            <div className="modal-body addd-form">
                                <div className="form-group">
                                    <label>Item ID</label>
                                    <input value={editItem.id} onChange={(e) => setEditItem({ ...editItem, id: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="number" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="number" value={editItem.stock} onChange={(e) => setEditItem({ ...editItem, stock: Number(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label>Restaurant</label>
                                    <input value={editItem.restaurant} onChange={(e) => setEditItem({ ...editItem, restaurant: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <Select
                                        options={[
                                            { value: 'Preparing', label: 'Preparing' },
                                            { value: 'Pending', label: 'Pending' },
                                            { value: 'Out for Delivery', label: 'Out for Delivery' }
                                        ]}
                                        value={{ value: editItem.status, label: editItem.status }}
                                        onChange={(selected) => setEditItem({ ...editItem, status: selected.value })}
                                        isSearchable={false}
                                        menuPlacement="auto"
                                        menuShouldScrollIntoView
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                            menuList: (base) => ({
                                                ...base,
                                                maxHeight: 180,
                                                overflowY: 'auto',
                                            }),
                                            control: (base, state) => ({
                                                ...base,
                                                borderColor: state.isFocused ? '#2F985A' : '#ccc',
                                                borderRadius: '6px',
                                                padding: '2px',
                                                fontSize: '14px',
                                                boxShadow: 'none',
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                color: '#111827',
                                                caretColor: '#111827',
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isSelected ? '#e5e7eb' : (state.isFocused ? '#f3f4f6' : '#fff'),
                                                color: '#111827',
                                            }),
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#f3f4f6',
                                                primary: '#2F985A',
                                            },
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-cancel" onClick={() => setEditItem(null)}>Cancel</button>
                                <button className="btn-save" onClick={handleSaveEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default MarketTable;
