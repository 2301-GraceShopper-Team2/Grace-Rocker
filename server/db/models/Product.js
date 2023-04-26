const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false, validate: { min: 0 } },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Fender_Stratocaster_004-2.jpg/800px-Fender_Stratocaster_004-2.jpg',
  },
  SKU: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Product;
