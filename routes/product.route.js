const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  updateProductById,
  createProduct,
  deleteProductById,
} = require("../controllers/product.controller.js");

// ROUTES FOR PRODUCTS
router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProductById);

router.post("/", createProduct);

router.delete("/:id", deleteProductById);

module.exports = router;
