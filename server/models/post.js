const sequelize = require ('sequelize')
const db = require ('../db/db.js')
const {DataTypes} = sequelize
const Post = db.define('post', {
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    posterId : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },  
      picture: {
        type: DataTypes.STRING,
        allowNull: true
      }
},{
    timestamps: true,
    modelName: 'posts',
    sequelize
  })

  Post.sync()

module.exports = Post