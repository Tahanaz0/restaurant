import React, { useMemo, useState } from "react";
import "./notification.css";

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

const Dot = ({ type }) => {
  const color = useMemo(() => {
    if (type === "success") return "#22c55e"; // green
    if (type === "warning") return "#f59e0b"; // amber
    if (type === "error") return "#ef4444"; // red
    return "#3b82f6"; // blue (info)
  }, [type]);
  return <span className="notif-dot" style={{ backgroundColor: color }} />;
};

const Notification = () => {
  const [items, setItems] = useState(initialNotifications);

  const clearAll = () => setItems([]);

  return (
    <div className="notif-container">
      <div className="notif-header">
        <div>
          <h2 className="notif-title">Notifications</h2>
          <p className="notif-subtitle">
            Send notifications and announcements to users
          </p>
        </div>
        {items.length > 0 && (
          <button className="notif-clear" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <div className="notif-list">
        {items.length === 0 ? (
          <div className="notif-empty">No notifications</div>
        ) : (
          items.map((n) => (
            <div key={n.id} className="notif-item">
              <div className="notif-item-left">
                <Dot type={n.type} />
              </div>
              <div className="notif-item-body">
                <div className="notif-item-title">{n.title}</div>
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