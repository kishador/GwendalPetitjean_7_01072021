const sequelize = require ('sequelize')
const db = require ('../db/db.js')
const {DataTypes} = sequelize
const User = db.define('user', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    pseudo : {
        type : DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      }
}, {
    timestamps: true,
    modelName: 'users',
    sequelize
  })

  User.sync()

module.exports = User