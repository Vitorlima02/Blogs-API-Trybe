const UserService = require('../services/userServices');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.createUser({ displayName, email, password, image });

  if (user.status >= 400) return res.status(user.status).json({ message: user.message });

  return res.status(user.status).json({ token: user.message });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.userLogin({ email, password });

  if (user.status >= 400) return res.status(user.status).json({ message: user.message });

  return res.status(user.status).json({ token: user.message });
};

module.exports = {
  createUser,
  userLogin,
};
