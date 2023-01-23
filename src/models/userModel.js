const { pool, format } = require('../helpers/database');

const register = async (values) => {
  const consulta = 'INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)';
  await pool.query(consulta, values);
};

const findByEmail = async (email) => {
  const values = [email];
  const consulta = 'SELECT * FROM usuarios WHERE email = $1';
  const { rows, rowCount } = await pool.query(consulta, values);
  return rows;
};

module.exports = {
  register,
  findByEmail,
};
