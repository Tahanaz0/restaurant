// UserDelete.jsx
import React, { useState } from "react";
import './userTable.css'
const UserDelete = ({ onDelete, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* trigger button */}
      <button className="dropdown1-btn1 danger" onClick={() => setOpen(true)}>
        {children}
      </button>

      {/* confirm modal */}
      {open && (
        <div className="ud-backdrop" onClick={() => setOpen(false)}>
          <div className="ud-modal" onClick={(e) => e.stopPropagation()}>
            <h4>Delete user?</h4>
            <p>This action cannot be undone.</p>
            <div className="ud-actions">
              <button
                className="ud-confirm"
                onClick={() => {
                  onDelete();     // 🔴 actually call parent handler
                  setOpen(false); // close modal
                }}
              >
                Delete
              </button>
              <button className="ud-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDelete;
