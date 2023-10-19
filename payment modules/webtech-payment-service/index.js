const STRIPE_TEST_KEY =
  "sk_test_51NzHrcLum16Dv5coRnNzTZT1t4iK2xgmsx7BME56kr2vPTE55usaJKSKweuTEc06PwQ9BN42NWCWzMRtkAcP9gF900Ktho0kWf";
const YOUR_DOMAIN = "http://localhost:3000/Card";
// This is your test secret API key.
const stripe = require("stripe")(STRIPE_TEST_KEY);

const cors = require("cors");

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const Tab = [];
  console.log("Connecting with Stripe...");

  const response = await fetch("http://localhost:3000/Card");
  const data = await response.json();

  for (let j = 0; j < data.length; j++) {
    Tab.push({ price: data[j]["stripe_price_id"], quantity: data[j]["quantity"] });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
      line_items: Tab,
      mode: "payment",
      success_url: `http://127.0.0.1:5500/index.html`,
      cancel_url: `http://127.0.0.1:5500/shoppingCart.html`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "FR"],
      },
  });

  res.json({ url: session.url });
});

app.listen(4242), () => console.log("Running on port '4242'");