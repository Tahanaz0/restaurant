import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import MarketTable from "./marketTable";
import Order from "./order";
import Gallery from "./Gallery";
import Select from "react-select"; // ✅ NEW IMPORT
import "./MarketTable.css";
import "./supperMarket.css";

const SupperMarket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    restaurant: "",
    status: "Preparing",
  });
  const [activeTab, setActiveTab] = useState("item");

  // ✅ React Select options
  const statusOptions = [
    { value: "Preparing", label: "Preparing" },
    { value: "Pending", label: "Pending" },
    { value: "Out for Delivery", label: "Out for Delivery" },
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
              + Add item
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
                <h2>Add Item</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body addd-form">
                <div className="form-group">
                  <label>Item ID</label>
                  <input
                    value={newItem.id}
                    onChange={(e) =>
                      setNewItem({ ...newItem, id: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={newItem.stock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, stock: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Restaurant</label>
                  <input
                    value={newItem.restaurant}
                    onChange={(e) =>
                      setNewItem({ ...newItem, restaurant: e.target.value })
                    }
                  />
                </div>

                {/* ✅ REPLACED STATUS SELECT */}
                <div className="form-group">
                  <label>Status</label>
                  <Select
                    options={statusOptions}
                    value={statusOptions.find(
                      (opt) => opt.value === newItem.status
                    )}
                    onChange={(selected) =>
                      setNewItem({ ...newItem, status: selected.value })
                    }
                    placeholder="Select Status"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({
                        ...base,
                        borderColor: "#ccc",
                        borderRadius: "6px",
                        padding: "2px",
                        fontSize: "14px",
                        boxShadow: "none",
                      }),
                    }}
                  />
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
                  Save
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
