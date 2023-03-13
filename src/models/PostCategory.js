module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
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
      foreignKey: 'postId',
      as: 'blogPost',
    });
    PostCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };
  
  return PostCategory;
};
