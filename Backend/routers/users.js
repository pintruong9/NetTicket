const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/", controller.getUsers);
console.log("GET /api/users");
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
module.exports = router;
