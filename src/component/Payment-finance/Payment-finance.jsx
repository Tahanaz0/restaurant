import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6"; // 📈 Revenue icon
import { FiClock } from "react-icons/fi"; // ⏰ Pending payouts icon
import { useTranslation } from 'react-i18next'; // 🌐 For language translation
import './payment.css';
import PaymentTable from "./paymentTable"; // 💰 Table component for payment data

// ✅ Main PaymentFinance component
const PaymentFinance = () => {
    // Translation hook from i18next
    const { t } = useTranslation();

    return (
        <>
            <div className="payment-container">
                {/* ===== Summary Boxes Section ===== */}
                <div className="payment-box">
                    
                    {/* ===== Total Revenue Card ===== */}
                    <div className="payment-boxes">
                        {/* 📈 Icon for revenue */}
                        <div>
                            <FaArrowTrendUp
                                style={{
                                    backgroundColor: '#E8EEF6',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    fontSize: '30px',
                                }}
                            />
                        </div>

                        {/* Title: "Total Revenue" (translated) */}
                        <div className="payment">
                            {t('totalRevenue')}
                        </div>

                        {/* 💵 Amount display */}
                        <div className="doller">$45,680</div>

                        {/* 📊 Subtitle: performance from last week (translated) */}
                        <div className="week">
                            {t('twelvePercentFromLastWeek')}
                        </div>
                    </div>

                    {/* ===== Pending Payouts Card ===== */}
                    <div className="payment-boxes">
                        {/* ⏰ Icon for pending payouts */}
                        <div>
                            <FiClock
                                style={{
                                    color: '#F91616',
                                    backgroundColor: '#F8E6E6',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    fontSize: '30px'
                                }}
                            />
                        </div>

                        {/* Title: "Pending Payouts" (translated) */}
                        <div className="payment">
                            {t('pendingPayouts')}
                        </div>

                        {/* 💵 Amount display */}
                        <div className="doller">$12,340</div>

                        {/* 📋 Subtitle: waiting for approval (translated) */}
                        <div className="week">
                            {t('awaitingApproval')}
                        </div>
                    </div>
                </div>

                {/* ===== Payment Table Section ===== */}
                <PaymentTable /> {/* Reusable table component showing detailed records */}
            </div>
        </>
    );
};

export default PaymentFinance;
