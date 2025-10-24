import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import './payment.css'
import PaymentTable from "./paymentTable";

const PaymentFinance = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="payment-container">
                <div className="payment-box">
                    <div className="payment-boxes">
                        <div><FaArrowTrendUp
                            style={{
                                // color:'#F91616',
                                backgroundColor: '#E8EEF6',
                                padding: '5px',
                                borderRadius: '5px',
                                fontSize: '30px',

                            }} />
                        </div>
                        <div className="payment">
                            {t('totalRevenue')}
                        </div>
                        <div className="doller">$45,680</div>
                        <div
                            className="week">{t('twelvePercentFromLastWeek')}</div>


                    </div>
                    <div className="payment-boxes">

                        <div>
                            <FiClock
                                style={{
                                    color: '#F91616',
                                    backgroundColor: '#F8E6E6',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    fontSize: '30px'
                                }} />
                        </div>
                        <div className="payment">
                        {t('pendingPayouts')}
                        </div>
                        <div className="doller">$12,340</div>
                        <div
                            className="week">{t('awaitingApproval')}</div>

                    </div>
                </div>
                <PaymentTable/>
            </div>
        </>
    )
}
export default PaymentFinance