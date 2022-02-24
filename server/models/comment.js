import sequelize from 'sequelize'
import db from '../db/db.js'
const {DataTypes} = sequelize
const Comment = db.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      content: {
          type: DataTypes.STRING,
          allowNull: false
      }
    }, {
        timestamps: true,
        modelName: 'comments',
        sequelize
    })
    
    Comment.sync()

    export default Comment