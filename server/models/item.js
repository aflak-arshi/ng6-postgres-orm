const Sequelize = require('sequelize');
const sequelize = require('../../database');

const Item = sequelize.define('items', {
	item_name: Sequelize.STRING
});

module.exports = Item;