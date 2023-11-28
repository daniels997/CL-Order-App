import React from 'react';

const Contact = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>CONTACT US</h1>

        <div className={`contact-container ${window.innerWidth <= 715 ? 'mobile-contact-container' : ''}`}>
            <div className='grayout'>
            <div className='instructions'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>GENERAL INQUIRIES MIAMI</h2>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    Toll Free: (866) 907-8463
                    <br></br>
                    Local: (305) 576-4785 Ext. 313, 314
                    <br></br>
                    Email: webservice@cltradingfl.com
                    <br></br>
                </p>    
            </div>
            </div>

            <div className='instructions'>
                <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>GENERAL INQUIRIES TAMPA</h2>
                <p style={{fontWeight:'bold'}}>Hakmin Kim</p>
                <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    Phone 1: (813) 630-5424
                    <br></br>
                    Phone 2: (912) 659-4233
                    <br></br>
                    Email: joonki96@cltradingfl.com
                    <br></br>
                </p>    
            </div>

            <div className={`${window.innerWidth <= 715 ? 'grayout' : ''}`}>
                <div className='instructions'>
                    <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>MIAMI SALES</h2>
                    <p style={{fontWeight:'bold'}}>Roberto</p>
                    <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                        Phone: (305) 576-4785 Ext. 312
                        <br></br>
                        Mobile: (786) 281-4982
                        <br></br>
                        Email: roberto_ceballos09@yahoo.es
                        <br></br>
                    </p>    
                    <p style={{fontWeight:'bold'}}>Hun Shin</p>
                    <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                        Phone: (305) 576-4785 Ext. 308
                        <br></br>
                        Email hunshin@cltradingfl.com
                        <br></br>
                    </p> 
                </div>
            </div>

            <div className={`${window.innerWidth >= 715 ? 'grayout' : ''}`}>
                <div className='instructions'>
                    <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>INTERNET SALES</h2>
                    <p style={{fontWeight:'bold'}}>Beatriz</p>
                    <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                        Phone: (305) 576-4785 Ext. 314
                        <br></br>
                        Cell: (786) 760-3585
                        <br></br>
                        Email: beatriz@cltradingfl.com
                        <br></br>
                    </p>    
                    <p style={{fontWeight:'bold'}}>Linda</p>
                    <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                        Phone: (305) 576-4785 Ext. 313
                        <br></br>
                        Email: customerservice@cltradingfl.com
                        <br></br>
                    </p>  
                </div>
            </div>

            <div className='grayout'>
                <div className='instructions'>
                    <h2 className={`${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>SOUTH / CENTRAL AMERICA</h2>
                    <p style={{fontWeight:'bold'}}>Claudia</p>
                    <p className={`${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                        Phone: (305) 576-4785 Ext. 316
                        <br></br>
                        Email: claudiarod1963@aol.com
                        <br></br>
                    </p>    
                </div>
            </div>

        </div>
    </div>
  );
};

export default Contact;
