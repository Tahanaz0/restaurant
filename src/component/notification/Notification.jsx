import React, { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./notification.css";

// ✅ Initial static notifications (dummy data for display)
const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "New order received",
    description: "Order #ORD-001 from John Smith",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "info",
    title: "Driver assigned",
    description: "Order #ORD-007 picked up by Mike D.",
    time: "5 minutes ago",
  },
  {
    id: 3,
    type: "info",
    title: "Driver assigned",
    description: "Order #ORD-007 picked up by Mike D.",
    time: "5 minutes ago",
  },
  {
    id: 4,
    type: "info",
    title: "Driver assigned",
    description: "Order #ORD-007 picked up by Mike D.",
    time: "5 minutes ago",
  },
  {
    id: 5,
    type: "info",
    title: "Driver assigned",
    description: "Order #ORD-007 picked up by Mike D.",
    time: "5 minutes ago",
  },
];

// ✅ Dot component (used for colored status indicators)
const Dot = ({ type }) => {
  // useMemo ensures the color only recalculates when 'type' changes
  const color = useMemo(() => {
    if (type === "success") return "#22c55e"; // green for success
    if (type === "warning") return "#f59e0b"; // amber for warning
    if (type === "error") return "#ef4444";   // red for error
    return "#3b82f6";                         // blue for info/default
  }, [type]);

  // Render small colored dot
  return <span className="notif-dot" style={{ backgroundColor: color }} />;
};

// ✅ Main Notification component
const Notification = () => {
  // Translation hook
  const { t } = useTranslation();

  // State for managing list of notifications
  const [items, setItems] = useState(initialNotifications);

  // ✅ Function to clear all notifications
  const clearAll = () => setItems([]);

  return (
    <div className="notif-container">
      {/* ===== Header Section ===== */}
      <div className="notif-header">
        <div>
          {/* Page title and subtitle (translated) */}
          <h2 className="notif-title">{t('notifications')}</h2>
          <p className="notif-subtitle">
            {t('sendNotificationsToUsers')}
          </p>
        </div>

        {/* "Clear All" button (only visible when notifications exist) */}
        {items.length > 0 && (
          <button className="notif-clear" onClick={clearAll}>
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* ===== Notifications List ===== */}
      <div className="notif-list">
        {/* If no notifications, show empty state */}
        {items.length === 0 ? (
          <div className="notif-empty">{t('noNotifications')}</div>
        ) : (
          // Otherwise, render each notification item
          items.map((n) => (
            <div key={n.id} className="notif-item">
              {/* Left side: colored dot */}
              <div className="notif-item-left">
                <Dot type={n.type} />
              </div>

              {/* Right side: notification details */}
              <div className="notif-item-body">
                {/* ✅ Title: automatically converted to lowercase key for translation */}
                <div className="notif-item-title">
                  {t(n.title.toLowerCase().replace(/\s+/g, ''))}
                </div>

                {/* ✅ Description and timestamp */}
                <div className="notif-item-desc">{n.description}</div>
                <div className="notif-item-time">{n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
