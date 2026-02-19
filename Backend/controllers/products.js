const pool = require("../config/database");

exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, category_id, title, description, price, available_quantity FROM product WHERE id = $1",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { category_id, title, description, price, available_quantity } =
      req.body;

    const result = await pool.query(
      `INSERT INTO product (category_id, title, description, price, available_quantity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [category_id, title, description, price, available_quantity],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, title, description, price, available_quantity } =
    req.body;
  try {
    const result = await pool.query(
      "UPDATE product SET category_id = $1, title = $2, description = $3, price = $4, available_quantity = $5  WHERE id = $6 RETURNING id, category_id, title, description, price, available_quantity",
      [category_id, title, description, price, available_quantity, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM product WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
