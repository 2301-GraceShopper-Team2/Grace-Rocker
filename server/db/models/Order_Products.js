const Sequelize = require("sequelize");
const db = require("../db");

const Order_Products = db.define("order_products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
  orderId: {
    type: Sequelize.INTEGER,
    references: { model: "Order", key: "id" },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: { model: "Product", key: "id" },
  },
});

module.exports = Order_Products;
