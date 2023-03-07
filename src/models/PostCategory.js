
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPost, {
      foreignKey: 'post_id',
      as: 'blogPost',
    });
    PostCategory.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
        models.BlogPost.belongsToMany(models.Category, { through: PostCategory });
    models.Category.belongsToMany(models.BlogPost, { through: PostCategory });
  };
  return PostCategory;
};
