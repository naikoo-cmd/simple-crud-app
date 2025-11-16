require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// USE PRODUCT ROUTES
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Product CRUD API");
});

// CONNECT TO MONGODB AND START THE LOCAL SERVER
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
