const router = require("express").Router();
const {
  models: { User, Order, Product, Order_Products },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isAdmin"],
      include: Order,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { id: req.params.id },
      attributes: ["id", "username", "email", "isAdmin"],
      include: Order,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
