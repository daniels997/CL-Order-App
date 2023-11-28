import React from 'react';

const About = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>WELCOME TO CL TRADING</h1>
      <div className='grayout'>
        <p className={`text-margin ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
              Since 2000, we’ve been known to our partners as the preeminent fashion 
              and beauty supplier to the U.S. and the world. Dealing in every aspect of 
              trade (import, wholesale and distributor), we offer our partners the lowest 
              price and exceptional customer service. We proudly serve the U.S. and 
              International markets including the Caribbean Islands, Central and Southern 
              America. Offering Original Equipment Manufacturing (O.E.M.) and Direct Shipment 
              from our manufacturing facilities. Volume discounts are readily available. Our 
              special relationships with manufacturers and exceptional service to our customers 
              has earned us a reputation as the preeminent beauty supplier of choice in the 
              industry. Customer service is our greatest asset. We appreciate our partners and 
              are grateful for their continued trust in us. We welcome new partnerships and are 
              ready to serve you with our utmost dedication and personalized service, regardless 
              of your location in the world.
          </p>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
};

export default About;
