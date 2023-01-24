const { pool } = require('../helpers/database');
const { showError } = require('../helpers/errorHelper');

const register = async (values, res) => {
  try {
    const consulta = 'INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)';
    await pool.query(consulta, values);
  } catch (e) {
    return showError(res, e);
  }
};

const findByEmail = async (email, res) => {
  try {
    const values = [email];
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await pool.query(consulta, values);
    return rows;
  } catch (e) {
    return showError(res, e);
  }
};

module.exports = {
  register,
  findByEmail,
};
