const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "surveydb",
  connectionLimit: 5,
});

const getUserByUsername = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE username=?", [username]);
    return rows[0];
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return null;
};

const createUser = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "INSERT INTO users(username, password) VALUES (?, ?)",
      [user.username, user.password]
    );
    return { id: response.insertId, ...user };
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return null;
};

module.exports = {
  getUserByUsername,
  createUser,
};
