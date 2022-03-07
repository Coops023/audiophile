const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  id: Number,
  countInStock: Number,
  slug: String,
  name: String,
  image: {
    mobile: { type: String },
    tablet: { type: String },
    desktop: { type: String },
  },
  category: String,
  categoryImage: {
    mobile: { type: String },
    tablet: { type: String },
    desktop: { type: String },
  },
  new: Boolean,
  price: Number,
  description: String,
  features: String,
  includes: [
    {
      quantity: { type: Number },
      item: { type: String },
    },
  ],
  gallery: {
    first: {
      mobile: { type: String },
      tablet: { type: String },
      desktop: { type: String },
    },
    second: {
      mobile: { type: String },
      tablet: { type: String },
      desktop: { type: String },
    },
    third: {
      mobile: { type: String },
      tablet: { type: String },
      desktop: { type: String },
    },
  },
  others: [
    {
      slug: { type: String },
      name: { type: String },
      image: {
        mobile: { type: String },
        tablet: { type: String },
        desktop: { type: String },
      },
    },
  ],
});

const Product = model("Product", productSchema);

module.exports = Product;
