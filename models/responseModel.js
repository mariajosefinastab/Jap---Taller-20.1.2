const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "surveydb",
  connectionLimit: 5,
});

const createResponse = async (response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const responseRecord = await conn.query(
      "INSERT INTO responses(userId, surveyId, answer) VALUES (?, ?, ?)",
      [response.userId, response.surveyId, response.answer]
    );
    return { id: responseRecord.insertId, ...response };
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return null;
};

const getResponsesBySurvey = async (surveyId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM responses WHERE surveyId=?", [surveyId]);
    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
  return [];
};

module.exports = {
  createResponse,
  getResponsesBySurvey,
};