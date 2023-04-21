const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {
    name: { type : Sequelize.STRING, allowNull: false },
    description: { type : Sequelize.TEXT, allowNull: false },   
    price: { type : Sequelize.FLOAT, allowNull: false, validate: { min: 0 } },
    imageURL: { type : Sequelize.STRING, defaultValue: 'https://reverb.com/item/67917685-1953-gibson-les-paul-gold-top' },
    SKU: { type : Sequelize.STRING, allowNull: false },
});




module.exports = Product;

