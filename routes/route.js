const mongoose = require("mongoose");
const Product = mongoose.model("Product");

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
      console.log(`Found ${item}`);
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
};
