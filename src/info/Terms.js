import React from 'react';

const Terms = () => {
  return (
    <div className="welcome-page">
      <h1 className={`info-header ${window.innerWidth <= 715 ? 'mobile-header' : ''}`}>TERMS & CONDITIONS</h1>

        <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Conditions of Use</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    By using the C&L Trading of Miami Web site (cltradingfl.com ), the customer 
                    hereby agrees to be bound by all the terms and conditions contained in this 
                    User Agreement. C&L Trading of Miami reserves the right at its discretion to 
                    change the terms of this Agreement and will notify users of any such changes 
                    by online postings. Your continued use of cltradingfl.com after the posting of 
                    any notice of change in terms shall constitute your acceptance to be bound by 
                    any such changes. YOU ACKNOWLEDGE THAT ANY RELIANCE UPON ANY JUDGMENT BY 
                    cltradingfl.com , BEING ANY STATEMENT OR INFORMATION ON cltradingfl.com SHALL 
                    BE AT CUSTOMERS SOLE DISCRETION.
                </p>
        </div>

          <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>General Disclaimer and Limitation of Liability</h2>
            <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                C&L Trading of Miami makes no warranty regarding cltradingfl.com or any content, services 
                or products provided though or in connection with cltradingfl.com . C&L Trading of Miami 
                expressly disclaims any and all warranties, express or implied, including, without 
                limitation:
                <ul>
                    <li>
                        Any warranties as to the availability, accuracy, completeness or content of 
                        information, products or services which are part of cltradingfl.com
                    </li>
                    <li>
                        Any liability of C&L Trading of Miami, its affiliates, licensors, employees, agents, 
                        or contractors, states limitations on any liability for damages caused or allegedly 
                        caused by any failure of performance, error, interruption, deletion, defect, delay in 
                        operation computer virus infections, communication line of failure, theft or unauthorized 
                        access to alteration of, use of records.
                    </li>
                    <li>
                        Although C&L Trading of Miami endeavors to maintain accurate, up-to-date information, 
                        photographs or graphic representations of product may not represent actual product packaging 
                        and/or color.
                    </li>
                </ul>
            </p>

          <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Return Policy</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    All return shipments must be accounted for as to the accuracy of the inventory being sent by the 
                    customers. IN ADDITION, YOU MUST RECEIVE AN RMA# FROM C&L AND NOTE IT IN THE RETURN DELIVERY. C&L 
                    Trading cannot be responsible for missing and/or damaged inventory, if the customer has signed-off 
                    on the contents of the return inventory on the invoice.
                    <br></br><br></br>
                    For all missing and/or damaged merchandise, you must report the status to your Sales Representative 
                    and/or Company in writing within 7-days of the delivery. Any items not reported within the 7-day 
                    period will not receive credit. In addition, any damaged items must be returned to C&L to++ assure 
                    the credit. If the item is sold by the dozen, the merchandise must be returned in the same manner. 
                    All shipments must be checked for freight damages before acceptance from carrier and must be noted 
                    on the Bill of Lading. C&L Trading is not responsible for damages in transit when using 3rd party 
                    transport. It is the customers' responsibility to notify the carrier for concealed damage claim when 
                    damages are found afterward.
                    <br></br><br></br>
                    Any return merchandise must be complete in its original packaging, and C&L must receive the items 
                    within 15-days of delivery. If for any reason the merchandise cannot be returned to C&L within the 
                    time allowed, your Sales Representative and/or Company must be notified before the 15-days are over. 
                    (*For a trial item, the 15-day rule may not apply, depending upon independent terms and conditions 
                    established between you and your Sales Representative.)
                    <br></br><br></br>
                    Upon receipt of the complete return merchandise, C&L will notify you with the decision no later than 
                    five (5) working days. Please keep in mind the Credit will not become effective unless the C&L Management 
                    formally approves the credit. If the return is a result of our error (you received an incorrect or defective 
                    item, etc.), full credit will be issued to your C&L Trading account for the same value of the item(s). C&L 
                    will also pay the return shipping costs if applicable. If the return is not due to an error on the part of C&L, 
                    a 15% stocking fee will be deducted from credit issued and we are not responsible for the shipping costs. The 
                    Sales Representative is not responsible for making the final decision on credits. As a courtesy to our customers, 
                    at the sole discretion of C&L, the Sales Representative may take back any returns pending final approval. If for 
                    any reason, a credit is not issued, the merchandise will be returned to you.
                </p>
          </div>

          <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>Privacy Policy</h2>
            <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                This statement discloses the privacy custom for C&L Trading of Miami Web site. We respect the privacy 
                of our customers, and therefore have implemented the following set of privacy policy guidelines. C&L 
                Trading of Miami provides information online about our products, and collect orders from our customers 
                that were given the authorization by C&L Trading of Miami. The purpose of this site is to provide you with 
                the most useful and helpful experience possible with C&L Trading.
            </p>

          <div className='grayout'>
            <h2 className={`instructions ${window.innerWidth <= 715 ? 'mobile-header-black' : ''}`}>We do not:</h2>
                <p className={`instructions ${window.innerWidth <= 715 ? 'mobile-text' : ''}`}>
                    <ul>
                        <li>
                        Provide personal information to any third party
                        </li>
                        <li>
                        Share the information we track on this site with third parties
                        </li>
                        <li>
                        Release personal information about any individual visitors
                        </li>
                    </ul>
                </p>
          </div>
    </div>
  );
};

export default Terms;
