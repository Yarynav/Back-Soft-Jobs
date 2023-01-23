const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { pool } = require('../helpers/database');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  let { email, password } = req.body;
  const usuarios = await UserModel.findByEmail(email);

  let { lenguage, rol } = usuarios[0];
  const { password: passwordEncriptada } = usuarios[0];
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta || !usuarios.length) {
    res.status(401).json({ message: 'Email o contraseña incorrecta' });
  } else {
    const token = jwt.sign({ email, rol, lenguage }, process.env.JWT_SECRET);
    res.send(token);
  }
};

module.exports = {
  login,
};
