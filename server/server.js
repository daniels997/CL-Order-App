const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

const port = 5000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_db',
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'cltradingsalessender@gmail.com',
    pass: 'fvxtemdpskblgwwu',
  },
});

//Submitting an order and writing it to the database and sending email
app.post('/order-submit', (req, res) => {
  const {
    customerName,
    customerPhone,
    now, 
    customerEmail,
    repNum,
    customerID,
    exportContent
  } = req.body;
  const filename = `CL-${now}.csv`;
  //const blob = new Blob([exportContent], { type: 'text/csv;charset=utf-8;' });

  const parsedNow = new Date(now);
  const date = parsedNow.toISOString().split('T')[0];
  const time = parsedNow.toISOString().split('T')[1].split(':')[0] + ':' + new Date().toISOString().split('T')[1].split(':')[1];

  // Insert data into the ordertb table
  pool.query(
    'INSERT INTO ordertb (cust_name, cust_phone, date, email, rep_num, cust_num, order_data) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [customerName, customerPhone, now, customerEmail, repNum, customerID, exportContent],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    }
  );

  const mailOptions = {
    from: 'cltradingsalessender@gmail.com',
    to: 'cltradingsalesorders@gmail.com',
    subject: `Your Order Details for ${customerName}`,
    text: `Hello Sales Rep ${repNum},\n
    You have recieved a new order. Attached is your customer's CSV file that you can directly upload into OMS.\n\n
    Customer Information that was provided:\n
    Name: ${customerName} \n
    Phone: ${customerPhone} \n
    Order created on: ${date} at ${time} (UTC)\n
    Customer Email: ${customerEmail} \n
    Customer ID#: ${customerID} \n\n
    Missing information was not provided by the customer.`,
    attachments: [
      {
        filename: filename,
        content: Buffer.from(exportContent, 'utf-8'),
      },
    ],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Order data inserted and email sent successfully' });
    }
  });
});


// Data RETRIEVAL
app.get('/categories', (req, res) => {
  pool.query('SELECT DISTINCT cat_name FROM category_item', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const categories = results.map((row) => row.cat_name);
      res.json(categories);
    }
  });
});  

app.get('/items', (req, res) => {
  const category = req.query.category;
  if (category) {
    // Fetch items for that category along with item_order
    pool.query(
      `
      SELECT ci.item_no, ci.item_order, inv.description, inv.unit_price, inv.unit, inv.mcq
      FROM category_item ci
      JOIN inv ON ci.item_no = inv.item_no
      WHERE ci.cat_name = ?
      `,
      [category],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const itemsData = results.map((row) => ({
            item_no: row.item_no,
            description: row.description,
            unit_price: row.unit_price,
            unit: row.unit,
            mcq: row.mcq,
            item_order: row.item_order,
          }));
          res.json(itemsData);
        }
      }
    );
  }
});

app.get('/all-items', (req, res) => {
  pool.query('SELECT * FROM inv', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const itemsData = results.map((row) => ({
        item_no: row.item_no,
        description: row.description,
        unit_price: row.unit_price,
        unit: row.unit,
        mcq: row.mcq,
        upc: row.upc
      }));
      res.json(itemsData);
    }
  });
});
// end of data retrieving endpoints  


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


