const {Sequelize} = require ('sequelize')
module.exports = new Sequelize('groupomania', 'root', 'P@store27', {dialect : 'mysql', host : 'localhost'})