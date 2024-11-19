const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "surveydb",
  connectionLimit: 5,
});

const createSurvey = async (survey) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "INSERT INTO surveys(title) VALUES (?)",
      [survey.title]
    );
    return { id: response.insertId, ...survey };
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return null;
};

const getSurveys = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM surveys");
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return [];
};

module.exports = {
  createSurvey,
  getSurveys,
};