module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    passoword: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  return User;
};