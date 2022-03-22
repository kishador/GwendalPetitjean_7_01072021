'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const bcrypt = require("bcrypt")
require('dotenv').config();
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

// UNE FOIS LA BASE DE DONNEES CREE MERCI DE DECOMMENTER CI-DESSOUS AVANT DE LANCER LE SERVEUR,
// ET REMPLACER LES VALUES ENTRE "" PAR RESPECTIVEMENT VOTRE EMAIL, NOM D'UTILISATEUR ET MOT DE PASSE
// AFIN DE CREER UN COMPTE OU DUPPLIQUER POUR PLUSIEURS COMPTES MODERATEUR.
// ENFIN SUPPRIMER OU RECOMMENTER LE CODE.
/*
const password = pw => bcrypt.hashSync(pw, 8);
const privilegedUser = sequelize.query(
`INSERT INTO Users (id,email,pseudo,password,isAdmin,createdAt,updatedAt)
VALUES (DEFAULT,"","","${password("")}",true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`);
*/

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes,
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user.js')(sequelize, Sequelize);
db.posts = require('./post.js')(sequelize, Sequelize);
db.comments = require('./comment.js')(sequelize, Sequelize);

module.exports = db;
