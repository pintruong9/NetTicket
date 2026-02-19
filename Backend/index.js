const express = require("express");
const app = express();
const PORT = 3000;
const userRouter = require("./routers/users");
const getCategories = require("./routers/categories");
const getProducts = require("./routers/products");

app.get("/", (req, res) => {
  res.send("Hello Database!");
});

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/categories", getCategories);
app.use("/api/products", getProducts);

app.listen(PORT, () => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
