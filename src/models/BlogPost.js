module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,

      content: DataTypes.STRING,

      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { timestamps: false, tableName: 'blogs_posts' }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'user_id' });
    BlogPost.belongsToMany(models.Category, {
      through: models.PostCategory,
      foreignKey: 'post_id',
    });
  };

  return BlogPost;
};