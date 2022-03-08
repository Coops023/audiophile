const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const { Types } = require("mongoose");

const stripe = require("stripe")(process.env.STRIPE_KEY);

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

  app.get("/stripe", (req, res) => {
    res.send(stripe);
  });

  app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
      const { product, token } = req.body;

      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotency_key,
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }

    res.json({ error, status });
  });
};
