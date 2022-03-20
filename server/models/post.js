'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
		onDelete: 'CASCADE'
      });

      models.Post.hasMany(models.Comment,
        { onDelete: 'CASCADE' });

    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    pictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};