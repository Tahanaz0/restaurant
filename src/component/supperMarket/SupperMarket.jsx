import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import MarketTable from "./marketTable";
import Order from "./order";
import Gallery from "./Gallery";
import Select from "react-select";
import "./MarketTable.css";
import "./supperMarket.css";

const SupperMarket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    preparationTime: "",
    availability: true,
    image: null,
  });
  const [activeTab, setActiveTab] = useState("item");

  // ✅ React Select options
  const categoryOptions = [
    { value: "Cleaning", label: "Cleaning" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Beverages", label: "Beverages" },
    { value: "Snacks", label: "Snacks" },
    { value: "Dairy & Eggs", label: "Dairy & Eggs" },
    { value: "Groceries", label: "Groceries" },
  ];

  const preparationTimeOptions = [
    { value: "5 minutes", label: "5 minutes" },
    { value: "10 minutes", label: "10 minutes" },
    { value: "15 minutes", label: "15 minutes" },
    { value: "20 minutes", label: "20 minutes" },
    { value: "30 minutes", label: "30 minutes" },
    { value: "45 minutes", label: "45 minutes" },
    { value: "1 hour", label: "1 hour" },
  ];

  return (
    <div className="support-manag">
      <div>
        <div className="user-first">
          <div className="support-management">
            <button
              className={`sup-btn ${activeTab === "item" ? "active" : ""}`}
              onClick={() => setActiveTab("item")}
            >
              Item
            </button>
            <button
              className={`sup-btn ${activeTab === "order" ? "active" : ""}`}
              onClick={() => setActiveTab("order")}
            >
              Order
            </button>
            <button
              className={`sup-btn ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </button>
          </div>
          <div className="user-second">
            <div className="input-wrapper">
              <CiSearch className="user-icon" />
              <input
                type="text"
                placeholder="Search by name email or phone..."
                className="user-input"
              />
            </div>
            <button className="user-btn" onClick={() => setIsModalOpen(true)}>
              + Add Items
            </button>
          </div>
        </div>

        {activeTab === "item" && <MarketTable />}
        {activeTab === "order" && <Order />}
        {activeTab === "gallery" && <Gallery />}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Item</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body addd-form">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="Surf Excel Detergent (1kg)"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    placeholder="Powerful stain remover, suitable for machine & hand wash"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <Select
                    options={categoryOptions}
                    value={categoryOptions.find(
                      (opt) => opt.value === newItem.category
                    )}
                    onChange={(selected) =>
                      setNewItem({ ...newItem, category: selected.value })
                    }
                    placeholder="Select category"
                    menuPortalTarget={document.body}
                    isSearchable={false}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({
                        ...base,
                        borderColor: "#ccc",
                        borderRadius: "6px",
                        padding: "2px",
                        fontSize: "14px",
                        boxShadow: "none",
                        backgroundColor: "#f9fafb",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#f3f4f6",
                        borderRadius: "6px",
                        marginTop: "4px",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#e5e7eb" : "#f3f4f6",
                        color: "#111827",
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#111827",
                      }),
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                    placeholder="$15.99"
                  />
                </div>
                <div className="form-group">
                  <label>How long will this order take to prepare?</label>
                  <Select
                    options={preparationTimeOptions}
                    value={preparationTimeOptions.find(
                      (opt) => opt.value === newItem.preparationTime
                    )}
                    onChange={(selected) =>
                      setNewItem({ ...newItem, preparationTime: selected.value })
                    }
                    placeholder="15 minutes"
                    menuPortalTarget={document.body}
                    isSearchable={false}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({
                        ...base,
                        borderColor: "#ccc",
                        borderRadius: "6px",
                        padding: "2px",
                        fontSize: "14px",
                        boxShadow: "none",
                        backgroundColor: "#f9fafb",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#f3f4f6",
                        borderRadius: "6px",
                        marginTop: "4px",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#e5e7eb" : "#f3f4f6",
                        color: "#111827",
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#111827",
                      }),
                    }}
                  />
                </div>
                <div  className="form-group-item">

                  <div className="form-group">
                    <label>Availability Status</label>
                    <div className="availability-section">
                      <div className="toggle-container">
                       
                        <span className="toggle-label">
                          {newItem.availability ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={newItem.availability}
                            onChange={(e) =>
                              setNewItem({ ...newItem, availability: e.target.checked })
                            }
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      <p className="availability-description">
                        Item will be available for ordering immediately
                      </p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Item Image</label>
                    <div className="image-upload-section">
                      <div className="image-upload-area">
                        <div className="upload-icon">☁️</div>
                        <p>Drag and drop images here or click to upload</p>
                      </div>
                      <button className="upload-btn">
                        📤 Upload Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={() => setIsModalOpen(false)}
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupperMarket;
