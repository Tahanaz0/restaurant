import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import MarketTable from "./marketTable";
import Order from "./order";
import Gallery from "./Gallery";
import Select from "react-select";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";


import "./MarketTable.css";
import "./supperMarket.css";

const SupperMarket = () => {
  const { t } = useTranslation();
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
    { value: "Cleaning", label: t('cleaning') },
    { value: "Personal Care", label: t('personalCare') },
    { value: "Beverages", label: t('beverages') },
    { value: "Snacks", label: t('snacks') },
    { value: "Dairy & Eggs", label: t('dairyEggs') },
    { value: "Groceries", label: t('groceries') },
  ];

  const preparationTimeOptions = [
    { value: "5 minutes", label: t('fiveMinutes') },
    { value: "10 minutes", label: t('tenMinutes') },
    { value: "15 minutes", label: t('fifteenMinutes') },
    { value: "20 minutes", label: t('twentyMinutes') },
    { value: "30 minutes", label: t('thirtyMinutes') },
    { value: "45 minutes", label: t('fortyFiveMinutes') },
    { value: "1 hour", label: t('oneHour') },
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
              {t('item')}
            </button>
            <button
              className={`sup-btn ${activeTab === "order" ? "active" : ""}`}
              onClick={() => setActiveTab("order")}
            >
              {t('order')}
            </button>
            <button
              className={`sup-btn ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              {t('gallery')}
            </button>
          </div>
          <div className="user-second">
            <div className="input-wrapper">
              <CiSearch className="user-icon" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="user-input"
              />
            </div>
            <button className="user-btn" onClick={() => setIsModalOpen(true)}>
              + {t('addItems')}
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
                <h2>{t('addNewItem')}</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body addd-form">
                <div className="input-sec">
                  <div className="form-group">
                    <label>{t('itemName')}</label>
                    <input
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      placeholder={t('itemNamePlaceholder')}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('description')}</label>
                    <input
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      placeholder={t('descriptionPlaceholder')}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('category')}</label>
                    <Select
                      options={categoryOptions}
                      value={categoryOptions.find(
                        (opt) => opt.value === newItem.category
                      )}
                      onChange={(selected) =>
                        setNewItem({ ...newItem, category: selected.value })
                      }
                      placeholder="Select category"
                      isSearchable={false}
                      styles={{
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
                          zIndex: 1000,
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
                      isSearchable={false}
                      styles={{
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
                          zIndex: 1000,
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
                </div>
                <h2>Image & status </h2>
                <div className="form-group-item">


                  <div className="form-group">
                    <label>Availability Status</label>
                    <div className="availability-section">
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
                      <div>
                        <div className="toggle-container">

                          <span className="toggle-label">
                            {newItem.availability ? "Available" : "Unavailable"}
                          </span>
                        </div>

                        <p className="availability-description">
                          Item will be available for ordering immediately
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="form-group">
                    <label>Item Image</label>
                    <div className="image-upload-section">
                      <div className="image-upload-area">
                        <div className="upload-icon"><IoImageOutline />
                        </div>
                        <p>Drag and drop images here or click to upload</p>
                      </div>
                      <button className="upload-btn">
                        <MdOutlineFileDownload />
                        Upload Image
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
