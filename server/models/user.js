import sequelize from 'sequelize'
import db from '../db/db.js'
const {DataTypes} = sequelize
const User = db.define('user', {
    id : {
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    userName : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      }
}, {
    timestamps: false,
    modelName: 'users',
    sequelize
  })

  User.sync()

export default User