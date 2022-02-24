import sequelize from 'sequelize'
import db from '../db/db.js'
const {DataTypes} = sequelize
const Post = db.define('post', {
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    idUSER : {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      }
},{
    timestamps: true,
    modelName: 'posts',
    sequelize
  })

  Post.sync()

export default Post