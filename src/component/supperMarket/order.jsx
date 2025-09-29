import React, { useState } from "react";
import './order.css'

const initialOrders = [
    { id: 'ORD-001', customer: 'John Smith', phone: '+1 234 567 8904', items: ['Basmati Rice (5kg)', 'Cooking Oil (1L)', 'Pepsi (1.5L)'], total: 21.98, status: 'new' },
    { id: 'ORD-005', customer: 'Sarah Johnson', phone: '+1 234 567 8904', items: ['Surf Excel (Large)', 'Colgate Toothpaste'], total: 45.47, status: 'new' },
    { id: 'ORD-003', customer: 'Mike Brown', phone: '+1 234 567 8904', items: ['Sugar (2kg)', 'Tea Pack (500g)'], total: 14.99, status: 'new' },
];

const Order = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [prepModalFor, setPrepModalFor] = useState(null); // order object
    const [prepTime, setPrepTime] = useState('15 minutes');

    const onAccept = (order) => {
        setPrepModalFor(order);
    };

    const onReject = (order) => {
        // Simple reject removes it for now
        setOrders(prev => prev.filter(o => o.id !== order.id));
    };

    const confirmPreparationTime = () => {
        setOrders(prev => prev.map(o => o.id === prepModalFor.id ? { ...o, status: 'accepted', prepTime } : o));
        setPrepModalFor(null);
    };

    const completeOrder = (order) => {
        setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'completed' } : o));
    };

    return (
        <div  className ='order-top'  style={{ padding: '10px' }}>
            <h2 style={{ marginBottom: '12px', color: '#111827' }}>Ready for Collection Delivery</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
                {orders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff' }}>
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid #eef2f7', display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Order #{order.id}</strong>
                            <span style={{ color: '#111827' }}>${order.total}</span>
                        </div>
                        <div style={{ padding: '12px 14px', color: '#374151', fontSize: '14px' }}>
                            <div style={{ marginBottom: '6px' }}>{order.customer}</div>
                            <div style={{ marginBottom: '10px', color: '#6b7280' }}>{order.phone}</div>
                            {order.items.map((it, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span>x {it}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '12px 14px', borderTop: '1px solid #eef2f7', display: 'flex', gap: '10px' }}>
                            {order.status === 'new' && (
                                <>
                                    <button onClick={() => onAccept(order)} className="btn-accept" >Accept</button>
                                    <button onClick={() => onReject(order)} className="btn-reject" >Reject</button>
                                </>
                            )}
                            {order.status === 'accepted' && (
                                <button onClick={() => completeOrder(order)} className="btn-complete" style={{  }}>Complete</button>
                            )}
                            {order.status === 'completed' && (
                                <span style={{ color: '#16a34a', fontWeight: 600 }}>Completed</span>
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
                            <button className="close-btn" onClick={() => setPrepModalFor(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <label style={{ display: 'block', marginBottom: '8px' }}>How long will this order take to prepare?</label>
                            <select value={prepTime} onChange={(e) => setPrepTime(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                                <option>10 minutes</option>
                                <option>15 minutes</option>
                                <option>20 minutes</option>
                                <option>30 minutes</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setPrepModalFor(null)}>Cancel</button>
                            <button className="btn-save" onClick={confirmPreparationTime}>Preparation Time</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;

