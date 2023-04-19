const router = require("express").Router();
const {
  models: { User, Order },
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

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  //requires auth
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
