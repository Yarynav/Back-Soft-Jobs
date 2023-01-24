const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { showError } = require('../helpers/errorHelper');

const register = async (req, res) => {
  let { email, lenguage, password, rol } = req.body;

  const previousUser = await UserModel.findByEmail(email, res);
  if (previousUser.length > 0) {
    res.status(409).json({ message: 'El usuario ya existe' });
    return;
  }

  password = bcrypt.hashSync(password);
  const values = [email, password, lenguage, rol];
  UserModel.register(values, res);
  res.send('regitrado');
};

const list = async (req, res) => {
  try {
    const user = await UserModel.findByEmail(req.user.email, res);
    res.json(user[0]);
  } catch (e) {
    return showError(res, e);
  }
};

module.exports = { register, list };
