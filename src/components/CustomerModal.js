// CustomerModal.js
import React, { useState, useEffect } from 'react';
import { useItemContext } from '../context/ItemContext';
import axios from 'axios';
import { on } from 'stream';

const CustomerModal = ({ showModal, onCancel }) => {
  const { allItemsWithQuantity } = useItemContext();

  const [customerID, setCustomerID] = useState(localStorage.getItem('customerID') || '');
  const [customerName, setCustomerName] = useState(localStorage.getItem('customerName') || '');
  const [customerEmail, setCustomerEmail] = useState(localStorage.getItem('customerEmail') || '');
  const [repNum, setRepNum] = useState('');
  const [customerPhone, setCustomerPhone] = useState(localStorage.getItem('customerPhone') || '');

  useEffect(() => {
    localStorage.setItem('customerID', customerID);
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerEmail', customerEmail);
    localStorage.setItem('customerPhone', customerPhone);
  }, [customerID, customerName, customerEmail, customerPhone]);

  const handleExportandDownload = () => {
    // Store name, email, and phone in localStorage
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerEmail', customerEmail);
    localStorage.setItem('customerPhone', customerPhone);
    localStorage.setItem('repNum', repNum || '');
    localStorage.setItem('customerID', customerID || '');

    if (
      (customerName || localStorage.getItem('customerName')) && 
      (customerPhone || localStorage.getItem('customerPhone')) && 
      (customerID || localStorage.getItem('customerID'))
    ) {      
      // Handle download functionality here
      const itemQuantities = JSON.parse(localStorage.getItem('itemQuantities'));
      const customerID = localStorage.getItem('customerID') || '110000';

      let exportContent = `${customerID},,,,\n`;

      Object.entries(itemQuantities).forEach(([item_no, quantity]) => {
        // Only export items with quantity greater than 0
        if (quantity > 0) {
          const itemData = allItemsWithQuantity.find((item) => item.item_no === item_no);
          if (itemData) {
            const { item_no, description, unit, unit_price } = itemData;
            const formattedPrice = parseFloat(unit_price).toFixed(2);
            exportContent += `${customerID},${item_no},${description} ${unit},${quantity},${formattedPrice}\n`;
          }
        }
      });

    /* This is what enables auto download into the browser */
    if (exportContent.length > "CUSTOMER ID,DESCRIPTION,UNIT,QUANTITY,PRICE\n".length) {
      // Create a Blob and download the export content as a CSV file
      const now = new Date().toISOString().replace('Z', '');
      const filename = `CL-${now+' '+customerName}.csv`;
      const blob = new Blob([exportContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      // link.click();
      document.body.removeChild(link);

      axios
      //.post('http://132.148.72.142:5000/order-submit', {
      //.post('http://localhost:5000/order-submit', {
      .post('http://192.168.2.249:5000/order-submit', {  
        customerName,
        customerPhone,
        now,
        customerEmail,
        repNum,
        customerID,
        exportContent
      })
      .then((response) => {
        console.log(response.data.message);
        alert('Order submitted successfully. An email has been sent with order details.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert('Cart is empty.');
    }
    } else {
      alert('Customer name, phone, and ID are required.');
    }
    onCancel();
  };

  return (
    showModal && (
      <div className="overlay">
        <div className="customer-modal">
          <p style={{ fontSize: '26px' }}>Please Enter Your Customer Information</p>

          <div className="input-container">
          <label htmlFor="name">
            Name<span className={customerName ? '' : 'required'}>*</span>:
          </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="input-container">
          <label htmlFor="phone">
            Phone number<span className={customerPhone ? '' : 'required'}>*</span>:
          </label>
            <input
              type="text"
              inputMode="numeric" 
              pattern="[0-9]*"
              id="CustomerPhone"
              placeholder="Phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="custID">
              Customer ID<span className={customerID ? '' : 'required'}>*</span>:
            </label>
            <input
              type="text"
              inputMode="numeric" 
              pattern="[0-9]*"
              id="CustomerID"
              placeholder="Customer ID"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>

          <button className="customer-modal-send" onClick={handleExportandDownload}>
            Send Order
          </button>
          <button className="customer-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default CustomerModal;
