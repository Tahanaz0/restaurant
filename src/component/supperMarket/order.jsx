import React, { useState } from "react";
import "./order.css";

const initialOrders = [
    {
        id: 'ORD-001',
        customer: 'John Smith',
        phone: '+1 234 567 8904',
        items: ['Basmati Rice (5kg)', 'Cooking Oil (1L)', 'Pepsi (1.5L)'],
        total: 21.98,
        status: 'new'
    },
    {
        id: 'ORD-005',
        customer: 'Sarah Johnson',
        phone: '+1 234 567 8904',
        items: ['Surf Excel (Large)', 'Colgate Toothpaste'],
        total: 45.47,
        status: 'new'
    },
    {
        id: 'ORD-003',
        customer: 'Mike Brown',
        phone: '+1 234 567 8904',
        items: ['Sugar (2kg)', 'Tea Pack (500g)'],
        total: 14.99,
        status: 'new'
    },
];

const Order = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [prepModalFor, setPrepModalFor] = useState(null);
    const [prepTime, setPrepTime] = useState('15 minutes');

    const onAccept = (order) => {
        setPrepModalFor(order);
    };

    const onReject = (order) => {
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
    };

    const confirmPreparationTime = () => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === prepModalFor.id ? { ...o, status: "accepted", prepTime } : o
            )
        );
        setPrepModalFor(null);
    };

    const completeOrder = (order) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === order.id ? { ...o, status: "completed" } : o))
        );
    };

    return (
        <div className="order-top">
            <h2 className="order-heading">Ready for Collection Delivery</h2>

            <div className="order-grid">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-card-header">
                            <strong>Order #{order.id}</strong>
                            <span>${order.total}</span>
                        </div>

                        <div className="order-card-body">
                            <div className="customer-name">{order.customer}</div>
                            <div className="customer-phone">{order.phone}</div>
                            {order.items.map((it, idx) => (
                                <div key={idx} className="order-item">
                                    <span>x {it}</span>
                                </div>
                            ))}
                        </div>

                        <div className="order-card-footer">
                            {order.status === "new" && (
                                <>
                                    <button onClick={() => onAccept(order)} className="btn-accept">
                                        Accept
                                    </button>
                                    <button onClick={() => onReject(order)} className="btn-reject">
                                        Reject
                                    </button>
                                </>
                            )}

                            {order.status === "accepted" && (
                                <button
                                    onClick={() => completeOrder(order)}
                                    className="btn-complete"
                                >
                                    Complete
                                </button>
                            )}

                            {order.status === "completed" && (
                                <span className="completed-text">Completed</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {prepModalFor && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Set Preparation Time</h3>
                            <button className="close-btn" onClick={() => setPrepModalFor(null)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>How long will this order take to prepare?</label>
                            <select
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                            >
                                <option>10 minutes</option>
                                <option>15 minutes</option>
                                <option>20 minutes</option>
                                <option>30 minutes</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setPrepModalFor(null)}>
                                Cancel
                            </button>
                            <button className="btn-save" onClick={confirmPreparationTime}>
                                Preparation Time
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
