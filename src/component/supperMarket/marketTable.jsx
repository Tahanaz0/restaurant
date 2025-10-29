import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Select from "react-select";

const getData = (t) => ({
  "Cleaning & Household": [
    {
      name: "Surf Excel Detergent (1kg)",
      description: t('surfExcelDescription'),
      price: "$5.25",
      status: true,
    },
  ],
  "Personal Care": [
    {
      name: "ChickColgate Toothpaste (120g)",
      description: t('colgateDescription'),
      price: "$2.75",
      status: true,
    },
  ],
  Beverages: [
    {
      name: "Pepsi (1.5L)",
      description: t('pepsiDescription'),
      price: "$1.99",
      status: false,
    },
  ],
  Snacks: [
    {
      name: "Oreo Biscuits (Pack of 6)",
      description: t('oreoDescription'),
      price: "$2.25",
      status: true,
    },
  ],
  "Dairy & Breakfast": [],
  "Grocery Essentials": [],
});

const MarketTable = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState(getData(t));

  // Update data when language changes
  useEffect(() => {
    setItems(getData(t));
  }, [t]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    category: '',
    index: -1,
    itemName: ''
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    category: '',
    index: -1,
    item: null
  });

  const handleToggle = (category, index) => {
    const updated = { ...items };
    updated[category][index].status = !updated[category][index].status;
    setItems(updated);
  };

  const openDeleteModal = (category, index, itemName) => {
    setDeleteModal({ isOpen: true, category, index, itemName });
  };
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, category: '', index: -1, itemName: '' });
  const handleDelete = () => {
    const updated = { ...items };
    updated[deleteModal.category].splice(deleteModal.index, 1);
    setItems(updated);
    closeDeleteModal();
  };

  const openEditModal = (category, index, item) => {
    setEditModal({ isOpen: true, category, index, item: { ...item } });
  };
  const closeEditModal = () => setEditModal({ isOpen: false, category: '', index: -1, item: null });
  const handleEditChange = (field, value) => {
    setEditModal(prev => ({ ...prev, item: { ...prev.item, [field]: value } }));
  };
  const handleSaveEdit = () => {
    const updated = { ...items };
    updated[editModal.category][editModal.index] = editModal.item;
    setItems(updated);
    closeEditModal();
  };

  return (
    <div className="product-table">
      {Object.keys(items).map((category) => (
        <div key={category} className="category-block">
          <h3 className="category-title">{category}</h3>

          {/* Each table gets its own horizontal scroller (table-wrapper) */}
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>{t('itemName')}</th>
                  <th>{t('description')}</th>
                  <th>{t('price')}</th>
                  <th>{t('status')}</th>
                  <th>{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {items[category].length > 0 ? (
                  items[category].map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td className="desc">{t(item.description)}</td>
                      <td>{item.price}</td>
                      <td>
                        <div className="status-toggle">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={item.status}
                              onChange={() => handleToggle(category, i)}
                            />
                            <span className="slider round"></span>
                          </label>
                          <span className={`status-text ${item.status ? "available" : "unavailable"}`}>
                            {item.status ? t('available') : t('unavailable')}
                          </span>
                        </div>
                      </td>
                      <td className="actions">
                        <FaEdit className="edit" onClick={() => openEditModal(category, i, item)} />
                        <FaTrashAlt className="deleteM" onClick={() => openDeleteModal(category, i, item.name)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-items">No items in this category</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>{t('deleteItem')}</h3>
              <FaTimes className="close-btn" onClick={closeDeleteModal} />
            </div>
            <div className="modal-body">
              <p>{t('deleteItemConfirm')} <strong>"{deleteModal.itemName}"</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeDeleteModal}>{t('cancel')}</button>
              <button className="delete-btn" onClick={handleDelete}>{t('delete')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>{t('editItem')}</h3>
              <FaTimes className="close-btn" onClick={closeEditModal} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t('itemName')}</label>
                <input type="text" value={editModal.item?.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} placeholder={t('enterItemName')} />
              </div>
              <div className="form-group">
                <label>{t('description')}</label>
                <textarea value={editModal.item?.description || ''} onChange={(e) => handleEditChange('description', e.target.value)} placeholder={t('enterItemDescription')} rows="3" />
              </div>
              <div className="form-group">
                <label>{t('price')}</label>
                <input type="text" value={editModal.item?.price || ''} onChange={(e) => handleEditChange('price', e.target.value)} placeholder={t('enterPrice')} />
              </div>
              <div className="form-group">
                <label>{t('status')}</label>
                <Select
                  options={[{ value: true, label: t('available') }, { value: false, label: t('unavailable') }]}
                  value={{ value: editModal.item?.status, label: editModal.item?.status ? t('available') : t('unavailable') }}
                  onChange={(selected) => handleEditChange('status', selected.value)}
                  placeholder={t('selectStatus')}
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({ ...base, borderColor: state.isFocused ? "#3BBE70" : "#d1d5db", borderRadius: "6px", padding: "2px", fontSize: "14px", boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 190, 112, 0.1)" : "none", minHeight: "38px", outline: "none", caretColor: "#3BBE70" }),
                    input: (base) => ({ ...base, caretColor: "#3BBE70", color: "#374151" }),
                    option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#f3f4f6" : "#fff", color: "#374151", cursor: "pointer" }),
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeEditModal}>{t('cancel')}</button>
              <button className="save-btn" onClick={handleSaveEdit}>{t('save')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTable;
