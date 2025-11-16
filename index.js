const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.models.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! from nodemon");
});

// GET ALL PRODUCTS ENDPOINT FROM models/product.models.js
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  GET A SINGLE PRODUCT BY ID ENDPOINT FROM models/product.models.js
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  UPDATE A PRODUCT BY ID ENDPOINT FROM models/product.models.js
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  CREATE A NEW PRODUCT ENDPOINT FROM models/product.models.js
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CONNECT TO MONGODB AND START THE LOCAL SERVER
mongoose
  .connect("mongodb+srv://admin-crud-api:1GqKNGSF6HhLrzbl@crud-api.1y3ple9.mongodb.net/?appName=CRUD-API")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
