const express = require("express");
const router = express.Router();
const controller = require("../controllers/products");

router.get("/", controller.getProducts);
console.log("[LOG] GET /api/products ");
router.get("/:id", controller.getProductId);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
module.exports = router;
