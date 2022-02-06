const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const schemaUser = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string().required(),
});

const responseValidate = (status, message) => ({
  status,
  message,
});

const findUserByEmail = async (email) => {
  const findUser = await User.findOne({ where: { email } });
  return findUser;
};

const createUser = async (data) => {
  try {
    const { error } = schemaUser.validate(data);

    if (error) return responseValidate(400, error.message);

    if (await findUserByEmail(data.email)) return responseValidate(409, 'User already registered');

    const newUser = await User.create(data);

    const jwtConfig = {
      expiresIn: '3d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, jwtConfig);

    return responseValidate(201, token);
  } catch (error) {
    return responseValidate(500, error.message);
  }
};

module.exports = {
  createUser,
};

// Consultei o repositório do Michael para função do responseValidate
// https://github.com/tryber/sd-014-b-project-blogs-api/pull/2/commits/6e74204d670b6e18a271bf8a616b6de5f0514722 