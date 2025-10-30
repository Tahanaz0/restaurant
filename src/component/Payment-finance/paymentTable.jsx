import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './paymentTable.css';
import Select from "react-select";
import { FiEdit, FiTrash } from 'react-icons/fi';

const getStatusOptions = (t) => [
  { value: "Pending", label: t('pending') },
  { value: "Completed", label: t('completed') }
];

const statusStyles = {
  Pending: { background: '#FEF3C7', color: '#92400e' },
  Completed: { background: '#D1FAE5', color: '#065F46' }
};

function StatusBadge({ status, t }) {
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
      {t(status.toLowerCase())}
    </span>
  );
}

const PaymentTable = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([
    { id: 1, user: 'Alex Rodriguez', type: 'Delivery', earnings: 1062.92, status: 'Pending', time: 'Week 1 - Jan 2024' },
    { id: 2, user: 'Sarah Wilson', type: 'Taxi', earnings: 2106.72, status: 'Completed', time: 'Week 1 - Jan 2024' },
    { id: 3, user: 'Tom Brown', type: 'Delivery', earnings: 756.71, status: 'Pending', time: 'Week 1 - Jan 2024' },
  ]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0, left: 'auto' });
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
      <h3 style={{ margin: '10px 0 6px 10px', fontWeight: 700 }}>{t('paymentHistory')}</h3>

      <table className="payment-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>{t('userName')}</th>
            <th>{t('type')}</th>
            <th>{t('totalEarnings')}</th>
            <th>{t('status')}</th>
            <th>{t('time')}</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id}>
              <td><input type="checkbox" /></td>
              <td style={{ color: 'black' }}>{row.user}</td>
              <td style={{ color: 'black' }}>{t(row.type.toLowerCase())}</td>
              <td style={{ color: 'black' }}>{`$${row.earnings}`}</td>
              <td><StatusBadge status={row.status} t={t} /></td>
              <td style={{ color: 'black' }}>{row.time}</td>

              {/* 3-dot menu cell */}
              <td className="actions-cell" style={{ position: 'relative' }}>
                <span
                  className="dots"
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.target.getBoundingClientRect();
                    const isRTL = document.documentElement.dir === "rtl";
                    const dropdownWidth = 150;
                    const viewportWidth = window.innerWidth;
                  
                    let top = rect.bottom + window.scrollY + 5;
                    let left = "auto";
                    let right = "auto";
                  
                    if (isRTL) {
                      // RTL layout — dropdown left se cut na ho
                      left = rect.left + window.scrollX - dropdownWidth + 10;
                      if (left < 10) left = 10; // screen se bahar na jaye
                    } else {
                      // LTR layout — dropdown right side se cut na ho
                      const rightSpace = viewportWidth - rect.right;
                      if (rightSpace < dropdownWidth) {
                        // agar right side kam jagah hai to left side me khol do
                        left = rect.left + window.scrollX - dropdownWidth + 10;
                        if (left < 10) left = 10;
                      } else {
                        right = viewportWidth - rect.right - window.scrollX - 10;
                      }
                    }
                  
                    setDropdownPosition({ top, left, right });
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
                      right: dropdownPosition.right,
                      left: dropdownPosition.left,
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
                      <FiEdit /> {t('edit')}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAskDelete(row);
                      }}
                      className="dropdown-btn delete-btn"
                    >
                      <FiTrash style={{ color: 'black' }} /> {t('delete')}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="ud-backdrop">
          <div className="ud-modal">
            <h4>{t('deleteRecord')}</h4>
            <p>{t('cannotBeUndone')}</p>
            <div className="ud-actions">
              <button className="ud-cancel" onClick={() => setDeleteId(null)}>{t('cancel')}</button>
              <button className="ud-confirm" onClick={handleConfirmDelete}>{t('delete')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRow && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{t('editPayment')}</h3>
              <button className="close-btn" onClick={() => setEditRow(null)}>×</button>
            </div>
            <div className="modal-body addd-form">
              <div className="form-group">
                <label>{t('userName')}</label>
                <input value={editRow.user} onChange={(e) => setEditRow({ ...editRow, user: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{t('type')}</label>
                <input value={editRow.type} onChange={(e) => setEditRow({ ...editRow, type: e.target.value })} />
              </div>
              <div className="form-group">
                <label>{t('totalEarnings')}</label>
                <input type="number" value={editRow.earnings} onChange={(e) => setEditRow({ ...editRow, earnings: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>{t('status')}</label>
                <Select
                  options={getStatusOptions(t)}
                  value={getStatusOptions(t).find(opt => opt.value === editRow.status)}
                  onChange={(selected) => setEditRow({ ...editRow, status: selected.value })}
                  isSearchable={false}
                  menuPlacement="auto"
                  menuShouldScrollIntoView
                />
              </div>
              <div className="form-group">
                <label>{t('time')}</label>
                <input value={editRow.time} onChange={(e) => setEditRow({ ...editRow, time: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setEditRow(null)}>{t('cancel')}</button>
              <button className="btn-save" onClick={handleSaveEdit}>{t('save')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
