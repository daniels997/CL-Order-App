import React from 'react';

import usMap from '../assets/us-map.png';
import hiMap from '../assets/us-map-hi.png';
import prMap from '../assets/us-map-pr.png';

import shippingDiscounts from '../assets/shipping-discounts.png'

const Shipping = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>SHIPPING & FREIGHT</h1>
        <div className='grayout'>
            <p className={`text-margin ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                To best serve you we have selected UPS as our preferred shipping partner. 
                See below for an estimate of UPS Ground transit times. To calculate the delivery 
                time for a package between a specific origin and destination contact us
                toll free at (866)-907-8463.
            </p>
        </div>
        <br></br><br></br>
        <img
            className={`${window.innerWidth <= 715 ? 'mobile-image' : ''}`}
            src={usMap}
            alt="United States Map"
        />
        <br></br><br></br>
        <img
            className={`${window.innerWidth <= 715 ? 'hi-mobile-image' : ''}`}
            src={hiMap}
            alt="Hawaii Map"
        />
        <span className="vertical-divider"></span>
        <img
            className={`${window.innerWidth <= 715 ? 'hi-mobile-image' : ''}`}
            src={prMap}
            alt="Puerto Rico Map"
        />
      
      <br></br><br></br><br></br>
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>SHIPPING RATES</h1>
        <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Domestic</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    We offer free and discounted shipping. We also deliver to 3rd party 
                    shipping agents from our Miami warehouse. Shipping agent must be 
                    located in Miami-Dade or Broward County. A $1,000 minimum purchase 
                    is required to qualify for free shipping.
                    <br></br><br></br>
                    Discount shipping (50% off shipping) is available for large volume 
                    orders.
                    <br></br><br></br>
                    For orders under $1,000 customer assumes all shipment fees. For your 
                    convenience merchandise pick-up is available.
                </p>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Overseas Shipments</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    Customers are responsible for overseas shipping. UPS and USPS Express Mail 
                    services are available.
                </p>
        </div>

        <br></br>
      <img
        className={`image-margin ${window.innerWidth <= 715 ? 'mobile-image' : ''}`}
        src={shippingDiscounts}
        alt="Shipping Discounts"
      />
    </div>
    
  );
};

export default Shipping;
