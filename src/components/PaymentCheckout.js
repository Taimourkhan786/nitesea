import React, { useState } from "react";

export default function PaymentCheckout() {
  const [loading, setLoading] = useState(false);

  const paymentData = {
    amount: 100, // PKR
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerMobile: "03001234567",
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/jazzcash/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect user to JazzCash Payment Page
        window.location.href = data.paymentUrl;
      } else {
        alert(data.message || "Payment initialization failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>JazzCash Checkout</h2>

      <p>
        <strong>Amount:</strong> PKR {paymentData.amount}
      </p>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#8a1538",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay with JazzCash"}
      </button>
    </div>
  );
}