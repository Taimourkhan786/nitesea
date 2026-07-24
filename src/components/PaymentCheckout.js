import axios from "axios";
import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://api.nitesea.com/create-payment",
        {
          amount: 1,
        }
      );

      const form = document.createElement("form");

      form.method = "POST";
      form.action =
        "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction";

      const fields = {
        MERCHANT_ID: "14833",
        MERCHANT_NAME: "Nitesea",
        TOKEN: data.token,
        PROCCODE: "00",
        TXNAMT: data.amount,
        CUSTOMER_MOBILE_NO: "03001234567",
        CUSTOMER_EMAIL_ADDRESS: "customer@test.com",
        SIGNATURE: "NITESEA123",
        VERSION: "MERCHANT_CART-0.1",
        TXNDESC: "Shopping Payment",
        SUCCESS_URL: "https://api.nitesea.com/payment-success",
        FAILURE_URL: "https://api.nitesea.com/payment-failure",
        CHECKOUT_URL: "https://api.nitesea.com/ipn",
        BASKET_ID: data.basketId,
        ORDER_DATE: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        CURRENCY_CODE: "PKR",
        TRAN_TYPE: "ECOMM_PURCHASE",
      };

      Object.keys(fields).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <button onClick={payNow} disabled={loading}>
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}