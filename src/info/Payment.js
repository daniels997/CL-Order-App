import React from 'react';

const Payment = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>PAYMENT</h1>

      <div className='grayout'>
        <div className={`payment-container ${window.innerWidth <= 715 ? 'mobile-payment-container' : ''}`}>
            <div className='payment-item'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Minimum Orders</h2>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    C&L Trading is a wholesale distributor and requires a minimum purchase of 
                    $200 on all orders.
                </p>
            </div>
            <div className='payment-item'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Payment Schedule</h2>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    C&L Trading requires partial payment on all orders prior to packing. 
                    The partial payment is 15% of the total order amount. Once the packing is 
                    complete, the remaining balance (including shipping freight) will be charged.
                </p>
            </div>
            <div className='payment-item'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Volume Pricing</h2>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                Volume pricing is available. Ask your sales representative about bulk discounts,
                or click here for our discount chart. Backorders will not be shipped without 
                prior consent from the customer. Once approved, the merchandise will be shipped 
                separately or along with their next order.
                </p>
            </div>
            <div className='payment-item'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Cancellation</h2>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                  *Orders canceled after packing will be charged a 15% restocking fee.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
