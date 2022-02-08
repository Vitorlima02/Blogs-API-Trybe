module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    timestamps: false, tablename: 'PostCategories' });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'blogpost',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategories;
};