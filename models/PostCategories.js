module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostsCategories', {
    timestamps: false, tablename: 'PostsCategories' });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategories;
};