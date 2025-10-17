import React from "react";
import { FaTrashAlt, FaEdit, FaTrash } from "react-icons/fa";

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
  // Handle edit functionality
  const handleEdit = (item, category) => {
    console.log('Edit item:', item, 'from category:', category);
    // Add your edit logic here
    alert(`Edit: ${item.name} from ${category}`);
  };

  // Handle delete functionality
  const handleDelete = (item, category) => {
    console.log('Delete item:', item, 'from category:', category);
    // Add your delete logic here
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      alert(`Delete: ${item.name} from ${category}`);
    }
  };

  return (
    <div className="product-table">
      {Object.keys(data).map((category) => (
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
              {data[category].length > 0 ? (
                data[category].map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td className="desc">{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.status ? (
                        <span className="status available">Available</span>
                      ) : (
                        <span className="status unavailable">Unavailable</span>
                      )}
                    </td>
                    <td className="actions">
                      <FaEdit className="edit" />
                      <FaTrashAlt className="deleteM" />
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
    </div>
  );
};

export default MarketTable;
