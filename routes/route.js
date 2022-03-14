const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const { Types } = require("mongoose");

const stripe = require("stripe")(
  "sk_test_51Jey09LQy018j8J0fDowHIqE40KPFGrkUixNdBAfaytS98fSVY8LS07k2wX3sOJWIowO7LQcTcmMHhJAE69qjlmo00EjCm4nSd"
);

module.exports = (app) => {
  app.get("/all-products", async (req, res) => {
    try {
      const item = await Product.find().limit(10);
      res.json({ item });
      console.log(`Found ${item.length} products`);
    } catch (err) {}
  });

  // routes below get items by category
  app.get("/all-speakers", async (req, res) => {
    try {
      const item = await Product.find({ category: "speakers" });
      res.json({ item });
      console.log(`Found ${speakers.length}`);
    } catch (err) {}
  });

  app.get("/all-headphones", async (req, res) => {
    try {
      const item = await Product.find({ category: "headphones" });
      res.json({ item });
      console.log(`Found ${item.length}`);
    } catch (err) {}
  });

  app.get("/all-earphones", async (req, res) => {
    try {
      const item = await Product.find({ category: "earphones" });
      res.json({ item });
      console.log(`Found ${item.length} `);
    } catch (err) {}
  });

  // get item by id
  app.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    console.log("server 47", id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    try {
      const item = await Product.findById(id);

      if (!id) {
        res.status(404).json({ message: `product not found ${id}` });
        return;
      }

      res.json({ item });
      console.log("found", item.name);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  app.post("/stripe/charge", async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });
};
