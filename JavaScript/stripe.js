const Stripe = require("stripe");
const SECRET_KEY =
  "sk_test_51NzHrcLum16Dv5coRnNzTZT1t4iK2xgmsx7BME56kr2vPTE55usaJKSKweuTEc06PwQ9BN42NWCWzMRtkAcP9gF900Ktho0kWf";
const PRODUCT_ID = "prod_OoJmLsuch3uhrx";
const getSingleProduct = async (Stripe) => {
  const product = await stripe.products.retrieve(PRODUCT_ID);
  console.log(product);
};
getSingleProduct(Stripe);
const getAllProducts = async (Stripe) => {
  const product = await stripe.products.list();
  console.log(product);
};
getAllProducts(Stripe);
