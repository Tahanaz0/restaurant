import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";
import Select from "react-select";

const data = {
  "Cleaning & Household": [
    {
      name: "Surf Excel Detergent (1kg)",
      description: "Powerful stain remover, suitable for machine & hand wash",
      price: "$5.25",
      status: true,
    },
  ],
  "Personal Care": [
    {
      name: "ChickColgate Toothpaste (120g)",
      description: "Cavity protection, refreshing mint flavor",
      price: "$2.75",
      status: true,
    },
  ],
  Beverages: [
    {
      name: "Pepsi (1.5L)",
      description: "Sparkling soft drink with bold taste",
      price: "$1.99",
      status: false,
    },
  ],
  Snacks: [
    {
      name: "Oreo Biscuits (Pack of 6)",
      description: "Chocolate cookies with creamy filling",
      price: "$2.25",
      status: true,
    },
  ],
  "Dairy & Breakfast": [],
  "Grocery Essentials": [],
};

const MarketTable = () => {
  const [items, setItems] = useState(data);
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

  // Toggle switch ka handler
  const handleToggle = (category, index) => {
    const updated = { ...items };
    updated[category][index].status = !updated[category][index].status;
    setItems(updated);
  };

  // Delete modal handlers
  const openDeleteModal = (category, index, itemName) => {
    setDeleteModal({
      isOpen: true,
      category,
      index,
      itemName
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      category: '',
      index: -1,
      itemName: ''
    });
  };

  const handleDelete = () => {
    const updated = { ...items };
    updated[deleteModal.category].splice(deleteModal.index, 1);
    setItems(updated);
    closeDeleteModal();
  };

  // Edit modal handlers
  const openEditModal = (category, index, item) => {
    setEditModal({
      isOpen: true,
      category,
      index,
      item: { ...item }
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      category: '',
      index: -1,
      item: null
    });
  };

  const handleEditChange = (field, value) => {
    setEditModal(prev => ({
      ...prev,
      item: {
        ...prev.item,
        [field]: value
      }
    }));
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

          <table className="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items[category].length > 0 ? (
                items[category].map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td className="desc">{item.description}</td>
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
                        <span
                          className={`status-text ${
                            item.status ? "available" : "unavailable"
                          }`}
                        >
                          {item.status ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </td>
                    <td className="actions">
                      <FaEdit 
                        className="edit" 
                        onClick={() => openEditModal(category, i, item)}
                      />
                      <FaTrashAlt 
                        className="deleteM" 
                        onClick={() => openDeleteModal(category, i, item.name)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-items">
                    No items in this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>Delete Item</h3>
              <FaTimes 
                className="close-btn" 
                onClick={closeDeleteModal}
              />
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{deleteModal.itemName}"</strong>?</p>
              {/* <p className="warning-text">This action cannot be undone.</p> */}
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn" 
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button 
                className="delete-btn" 
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Edit Item</h3>
              <FaTimes 
                className="close-btn" 
                onClick={closeEditModal}
              />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={editModal.item?.name || ''}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  placeholder="Enter item name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editModal.item?.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  placeholder="Enter item description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  value={editModal.item?.price || ''}
                  onChange={(e) => handleEditChange('price', e.target.value)}
                  placeholder="Enter price (e.g., $5.25)"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <Select
                  options={[
                    { value: true, label: 'Available' },
                    { value: false, label: 'Unavailable' }
                  ]}
                  value={{
                    value: editModal.item?.status,
                    label: editModal.item?.status ? 'Available' : 'Unavailable'
                  }}
                  onChange={(selected) => handleEditChange('status', selected.value)}
                  placeholder="Select status"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused ? "#3BBE70" : "#d1d5db",
                      borderRadius: "6px",
                      padding: "2px",
                      fontSize: "14px",
                      boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 190, 112, 0.1)" : "none",
                      minHeight: "38px",
                      outline: "none",
                      caretColor: "#3BBE70",
                      "&:hover": {
                        borderColor: "#3BBE70"
                      }
                    }),
                    input: (base) => ({
                      ...base,
                      caretColor: "#3BBE70",
                      color: "#374151"
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#f3f4f6"   // hover bg (light gray)
                        : "#fff",     // normal
                      color: "#374151", // text color
                      cursor: "pointer",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn" 
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button 
                className="save-btn" 
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTable;
