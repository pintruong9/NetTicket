const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories");

router.get("/", controller.getCategories);
console.log("[LOG] GET /api/categories ");

module.exports = router;
