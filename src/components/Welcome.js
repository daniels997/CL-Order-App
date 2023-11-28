import React, { useState } from 'react';

import ItemGrid from './ItemGrid';
import About from '../info/About';
import Contact from '../info/Contact';
import Payment from '../info/Payment';
import Shipping from '../info/Shipping';
import Terms from '../info/Terms';
import Account from '../info/Account';

const Welcome = ({ newItems, trendingItems }) => {
  // Initialize visibility state for different sections
  const [sectionVisibility, setSectionVisibility] = useState({
    welcome: true,
    about: false,
    contact: false,
    payment: false,
    shipping: false,
    terms: false,
    customer: false
  });

  // Function to handle section visibility
  const handleSectionClick = (sectionName) => {
    const scrollPosition = window.innerWidth <= 715 ? 670 : 500;
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    setSectionVisibility((prevState) => ({
      ...prevState,
      [sectionName]: true,
    }));

    // Set all other sections to false
    for (const key in sectionVisibility) {
      if (key !== sectionName) {
        setSectionVisibility((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    }
  };

  return (
    <div className="welcome-page">
      <br />
      <h1>Welcome!</h1>

      <div className='instructions'>
        <h3>Note to New Customers:</h3>
        <p>
          *Click or tap the logo to return to this page.* <br /><br />
          Select items and populate your cart!
          The cart button on the top right will display all current items. <br /><br />
          To check out, click on the plane icon next to the cart and your order will be sent to us.
          A sales member will contact you shortly about policies and payment. <br /><br />
          This method is put in place for efficient checkout.
        </p>
      </div>

      <div style={{ textAlign: 'left', marginLeft: '17px' }}>
        <h3>More Info:</h3>
        <div className={`cool-button-container ${window.innerWidth <= 715 ? 'mobile-cool-button-container' : ''}`}>
          <button onClick={() => handleSectionClick('about')} className='cool-button'>About Us</button>
          <button onClick={() => handleSectionClick('payment')} className='cool-button'>Payment</button>
          <button onClick={() => handleSectionClick('shipping')} className='cool-button'>Shipping and Freight</button>
          <button onClick={() => handleSectionClick('terms')} className='cool-button'>Terms and Conditions</button>
          <button onClick={() => handleSectionClick('contact')} className='cool-button'>Contact Us</button>
          <button onClick={() => handleSectionClick('customer')} className='cool-button'>Create an Account</button>
        </div>
      </div>

      {sectionVisibility.about && <About />}
      {sectionVisibility.contact && <Contact />}
      {sectionVisibility.payment && <Payment />}
      {sectionVisibility.shipping && <Shipping />}
      {sectionVisibility.terms && <Terms />}
      {sectionVisibility.customer && <Account />}

      {sectionVisibility.welcome && (
        <div>
          <p style={{
            fontSize: '26px',
            textAlign: 'left',
            marginLeft: '15px',
            marginBottom: '-10px',
            fontWeight: 'bold'
          }}>
            New Shipment:
          </p>

          <div className="row-display">
            <ItemGrid category={newItems()} />
          </div>

          <p style={{
            fontSize: '26px',
            textAlign: 'left',
            marginLeft: '15px',
            marginBottom: '-10px',
            fontWeight: 'bold'
          }}>
            Trending:
          </p>

          <div className="row-display">
            <ItemGrid category={trendingItems()} />
          </div>
        </div>
      )}

      <p className={`${window.innerWidth <= 715 ? 'mobile-footer' : 'footer'}`}>
        (305) 576-4785 <br /> 12847 NW 45th Ave, Opa-locka, FL 33054, USA
      </p>
    </div>
  );
};

export default Welcome;
