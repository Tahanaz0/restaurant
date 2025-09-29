import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import './payment.css'

const PaymentFinance = () => {
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
                                borderRadius: '5px'
                            }} />
                        </div>
                        <div className="payment">
                            Total Revenue
                        </div>
                        <div className="doller">$45,680</div>
                        <div
                            className="week">+12% from last week</div>


                    </div>
                    <div className="payment-boxes">

                        <div>
                            <FiClock
                                style={{
                                    color: '#F91616',
                                    backgroundColor: '#F8E6E6',
                                    padding: '5px',
                                    borderRadius: '5px'
                                }} />
                        </div>
                        <div className="payment">
                        Pending Payouts
                        </div>
                        <div className="doller">$12,340</div>
                        <div
                            className="week">Awaiting approval</div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentFinance