const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const { id } = decoded;

    const user = await User.findOne({ where: { id } });
    
    if (!user) return res.status(401).json({ message: 'Token user not found' });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

// Como fazer a validação do token
// https://stackoverflow.com/questions/55844913/how-to-implement-jwt-verify-token-in-node-js
