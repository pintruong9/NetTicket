const pool = require("../config/database");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT user_id, name, email, role, created_at FROM users WHERE user_id = $1",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password_hash } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phone, password_hash],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, phone = $3 WHERE user_id = $4 RETURNING user_id, name, email, phone",
      [name, email, phone, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
