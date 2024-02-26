import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const generateWarrantyCard = () => {
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(issueDate.getMonth() + 6);

    const customerDetails = {
      orderId: orderId,
      customerName: customerName,
      warrantyStart: formatDate(issueDate),
      warrantyEnd: formatDate(expiryDate),
    };

    const doc = new jsPDF();

    doc.setFontSize(11);
    doc.text('GADGETSWEAR', 10, 10);
    doc.text('Karol Bagh, New Delhi', 10, 16);
    doc.text('support@gadgetswear.com', 10, 22);
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.text('WARRANTY CERTIFICATE', 105, 40, null, null, 'center');
    doc.setFontSize(11);
    doc.setFont('times', 'normal');
    doc.text(`Name: ${customerDetails.customerName}`, 10, 50);
    doc.text(`Order ID: ${customerDetails.orderId}`, 10, 60);
    doc.text(`Warranty Issued: ${customerDetails.warrantyStart}`, 10, 70);
    doc.text(`Warranty Expiry: ${customerDetails.warrantyEnd}`, 10, 80);
    doc.save(`${customerDetails.customerName}-warranty-card.pdf`);
  };

  return (
    <div className="App">
      <h2>Warranty Card Generator</h2>
      <div>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <button onClick={generateWarrantyCard}>
        Download Warranty Card
      </button>
    </div>
  );
}

export default App;
