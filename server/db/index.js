//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Order_Products = require('./models/Order_Products');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, {through: Order_Products});
Order.belongsToMany(Product, {through: Order_Products});

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products
  },
}
