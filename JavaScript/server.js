// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require("express");
const app = express();
const stripe = require("stripe")(
  "pk_test_51NzHrcLum16Dv5co6wnh8sBQQavPPufEF0prIdPZD6gzzIMDcUOCKnFemqYvck1AzIcmaA6Eugr4sJmPEF6Nqx5J00Ax6eQIAv"
);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "euro",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
