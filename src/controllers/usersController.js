const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { jwtDecode } = require('../helpers/jwtDecode');
const { showError } = require('../helpers/errorHelper');

const register = async (req, res) => {
  let { email, lenguage, password, rol } = req.body;

  const previousUser = await UserModel.findByEmail(email);
  if (previousUser.length > 0) {
    res.status(409).json({ message: 'El usuario ya existe' });
    return;
  }

  password = bcrypt.hashSync(password);
  const values = [email, password, lenguage, rol];
  UserModel.register(values);
  res.send('regitrado');
};

const list = async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const { email } = jwtDecode(token);
    const user = await UserModel.findByEmail(email);
    res.json(user[0]);
  } catch (e) {
    return showError(res, e);
  }
};

module.exports = { register, list };
