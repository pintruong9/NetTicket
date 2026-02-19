const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/", controller.getUsers);
console.log("GET /api/users");
router.post("/", controller.createUser);

module.exports = router;
