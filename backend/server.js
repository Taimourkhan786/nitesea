const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MERCHANT_ID = "14833";
const SECURED_KEY = "rPcy4T7GQkSCFsHBLdn26s";

app.post("/create-payment", async (req, res) => {
  try {
    const basketId = "ORDER-" + Date.now();
    const amount = req.body.amount;

    const params = new URLSearchParams();
    params.append("MERCHANT_ID", MERCHANT_ID);
    params.append("SECURED_KEY", SECURED_KEY);
    params.append("BASKET_ID", basketId);
    params.append("TXNAMT", amount);
    params.append("CURRENCY_CODE", "PKR");

    const { data } = await axios.post(
      "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(data);

    res.json({
      token: data.ACCESS_TOKEN,
      basketId,
      amount,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json(err.response?.data || err.message);
  }
});

app.get("/payment-success", (req, res) => {
  res.send("Payment Success");
});

app.get("/payment-failure", (req, res) => {
  res.send("Payment Failed");
});

app.post("/ipn", (req, res) => {
  console.log("IPN:", req.body);
  res.status(200).send("OK");
});

app.listen(5000, () => {
  console.log("Server Started");
});