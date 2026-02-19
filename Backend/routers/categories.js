const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories");

router.get("/", controller.getCategories);
console.log("[LOG] GET /api/categories ");
router.get("/:id", controller.getCategoryId);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
