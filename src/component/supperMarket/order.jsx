import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from 'react-i18next'; // 🌐 For internationalization
import "./order.css";

// 🧾 Initial static list of demo orders
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
    const { t } = useTranslation(); // Hook for translation (i18n)
    const [orders, setOrders] = useState(initialOrders); // 🧾 All orders
    const [prepModalFor, setPrepModalFor] = useState(null); // 📦 Order currently being prepared
    const [prepTime, setPrepTime] = useState('15 minutes'); // ⏱️ Selected preparation time
    const selectRef = useRef(null); // Reference for react-select dropdown
    const modalRef = useRef(null); // Reference for modal (used for scroll handling)

    // 🧠 Effect to control scroll inside the react-select dropdown in modal
    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement || !selectRef.current?.state.menuIsOpen) return;

        // Prevent background scrolling when select dropdown is open
        const handleWheel = (event) => {
            const menuList = selectRef.current?.select?.menuListRef;
            if (menuList) {
                event.preventDefault();
                menuList.scrollTop += event.deltaY;
            }
        };

        modalElement.addEventListener('wheel', handleWheel);

        // Cleanup listener when modal or dropdown closes
        return () => {
            modalElement.removeEventListener('wheel', handleWheel);
        };
    }, [prepModalFor, selectRef.current?.state.menuIsOpen]);

    // ✅ When order is accepted, open modal to set preparation time
    const onAccept = (order) => {
        setPrepModalFor(order);
    };

    // ❌ Reject order (remove from list)
    const onReject = (order) => {
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
    };

    // ⏱️ Confirm preparation time and update order status
    const confirmPreparationTime = () => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === prepModalFor.id ? { ...o, status: "accepted", prepTime } : o
            )
        );
        setPrepModalFor(null);
    };

    // ✅ Mark order as completed
    const completeOrder = (order) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === order.id ? { ...o, status: "completed" } : o))
        );
    };

    return (
        <div className="order-top">
            {/* 🧾 Page Heading */}
            <h2 className="order-heading">{t('readyForCollection')}</h2>

            {/* 📦 Order Grid */}
            <div className="order-grid">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        {/* 🧾 Order Header */}
                        <div className="order-card-header">
                            <strong>{t('order')} #{order.id}</strong>
                            <span>${order.total}</span>
                        </div>

                        {/* 👤 Order Body with customer info */}
                        <div className="order-card-body">
                            <div className="customer-name">
                                {t('customer')}: {order.customer}
                            </div>
                            <div className="customer-phone">
                                {t('phone')}: {order.phone}
                            </div>

                            {/* 🛍️ List of ordered items */}
                            {order.items.map((it, idx) => (
                                <div key={idx} className="order-item">
                                    <span>x {it}</span>
                                </div>
                            ))}
                        </div>

                        {/* ⚙️ Footer buttons based on order status */}
                        <div className="order-card-footer">
                            {order.status === "new" && (
                                <>
                                    <button onClick={() => onAccept(order)} className="btn-accept">
                                        {t('accept')}
                                    </button>
                                    <button onClick={() => onReject(order)} className="btn-reject">
                                        {t('reject')}
                                    </button>
                                </>
                            )}

                            {order.status === "accepted" && (
                                <button
                                    onClick={() => completeOrder(order)}
                                    className="btn-complete"
                                >
                                    {t('complete')}
                                </button>
                            )}

                            {order.status === "completed" && (
                                <span className="completed-text">{t('completed')}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🕒 Modal for setting preparation time */}
            {prepModalFor && (
                <div className="modal-overlay">
                    <div className="modal" ref={modalRef}>
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3>{t('setPreparationTime')}</h3>
                            <button
                                className="close-btn"
                                onClick={() => setPrepModalFor(null)}
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <label>{t('howLongToPrepare')}</label>
                            <Select
                                ref={selectRef}
                                options={[
                                    { value: '10 minutes', label: t('tenMinutes') },
                                    { value: '15 minutes', label: t('fifteenMinutes') },
                                    { value: '20 minutes', label: t('twentyMinutes') },
                                    { value: '30 minutes', label: t('thirtyMinutes') },
                                ]}
                                value={{
                                    value: prepTime,
                                    label: t(
                                        prepTime === '10 minutes'
                                            ? 'tenMinutes'
                                            : prepTime === '15 minutes'
                                            ? 'fifteenMinutes'
                                            : prepTime === '20 minutes'
                                            ? 'twentyMinutes'
                                            : prepTime === '30 minutes'
                                            ? 'thirtyMinutes'
                                            : ''
                                    ),
                                }}
                                onChange={(selected) => setPrepTime(selected.value)}
                                isSearchable={false}
                                menuPlacement="auto"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused ? "#2F985A" : "#ccc",
                                        borderRadius: "6px",
                                        padding: "2px",
                                        fontSize: "14px",
                                        boxShadow: "none",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        maxHeight: 180,
                                        overflowY: 'auto',
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected
                                            ? "#e5e7eb"
                                            : state.isFocused
                                            ? "#f3f4f6"
                                            : "#fff",
                                        color: "#111827",
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: "#f3f4f6",
                                        primary: "#2F985A",
                                    },
                                })}
                            />
                        </div>

                        {/* Modal Footer Buttons */}
                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={() => setPrepModalFor(null)}
                            >
                                {t('cancel')}
                            </button>
                            <button
                                className="btn-save"
                                onClick={confirmPreparationTime}
                            >
                                {t('preparationTime')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
