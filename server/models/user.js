const Sequelize = require('sequelize');
const sequelize = require('../../database');

const User = sequelize.define('users', {
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

module.exports = User;