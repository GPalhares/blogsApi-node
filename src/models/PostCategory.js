
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
  };
  return PostCategory;
};
