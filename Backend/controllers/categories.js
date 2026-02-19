const pool = require("../config/database");

exports.getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
