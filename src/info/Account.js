import React from 'react';

const Account = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>CREATE AN ACCOUNT</h1>

        <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>NEW CUSTOMERS</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                CL Trading is a wholesale distributor. To become a member, you must provide 
                a copy of your ID and business license. To get started, please follow the 
                directions below.For access to pricing information and our seasonal catalogs, 
                please create an online account once you have completed your application.
                </p>
        </div>

          <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>IN THE U.S.</h2>
            <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                <ol>
                    <li>
                    Provide a copy of your ID or Driver's License
                    </li>
                    <li>
                    Provide a copy of your Re-sale Tax ID or Salon License
                    </li>
                    <li>
                    Submit your scanned documents by email or fax.
                    </li>
                </ol>
            </p>

          <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>OUTSIDE THE U.S. (INTERNATIONAL)</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                  <ol>
                    <li>
                    Provide a copy of your ID or Driver's License
                    </li>
                    <li>
                    Provide a copy of your Business Permit, Re-sale Tax ID or Salon License
                    </li>
                    <li>
                    Submit your scanned documents by email or fax.
                    </li>
                  </ol>
                </p>
          </div>

          <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>EMAIL / FAX</h2>
            <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
              Email:webservice@cltradingfl.com
              <br></br>
              Fax:305-576-5247
            </p>

      
    </div>
  );
};

export default Account;
