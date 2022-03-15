const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const { Types } = require("mongoose");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

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

  //stripe routes
  const calculateOrderAmount = (items) => {
    // let total = 0;
    // let vat = (total * 20) / 100;
    // const shipping = 5000;
    // for (let element of items) {
    //   total = element.price * element.qty * 100;
    // }

    return 10000;
  };

  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
