const router = require("express").Router();
const {
  models: { Order, Product, User, Order_Products },
} = require("../db");

//Fetches order by id regardless of the order, such as cart or checkout

router.get("/orders/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await Order.findByPk(id, {
      include: [{ model: Product, through: Order_Products }],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//Get all carts for a user (Order History)

router.get("/user/:id/orders", async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await Order.findAll({
      where: { userId: id, isFulfilled: true },
      include: [{ model: Product, through: Order_Products }],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// single cart for a user
router.get("/user/:id/cart", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Order.findAll({
      where: { userId: id, isFulfilled: false },
      include: [{ model: Product, through: Order_Products }],
    });
    const cart = data[0];
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//Create cart

router.post("/user/:id/cart", async (req, res, next) => {
  try {
    const id = req.params.id;
    const newCart = await Order.create({ userId: id });
    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

// Change cart status to fulfilled
router.put("/cart/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Order.findByPk(id);
    const newCart = await cart.update({ isFulfilled: true });
    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

//Update Cart with additional items

// router.post("/cart/:id/product/productId", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const productId = req.params.productId;
//     const { quantity } = req.body;

//     const productCart = await Order_Products.findOne({
//       where: { orderId: id, productId },
//     });
//     if (productCart) {
//       productCart.quantity += quantity;
//       await productCart.save();
//     } else {
//       await Order_Products.create({ orderId: id, productId, quantity });
//     }
//     res.send("Item added to cart");
//   } catch (err) {
//     next(err);
//   }
// });

//Add item to cart!!!!!!

router.post("/cart/:orderId/product/:productId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    const productCart = await Order_Products.findOne({
      where: { orderId: orderId, productId },
    });
    if (!productCart) {
      const newProductOrder = await Order_Products.create({
        orderId: orderId,
        productId,
        quantity: 1,
      });
      res.send(newProductOrder);
    } else {
      res.send("Product already in cart");
    }
  } catch (err) {
    next(err);
  }
});

//Change quantity in cart
router.put("/cart/:orderId/product/:productId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const { val } = req.body;

    const productInCart = await Order_Products.findOne({
      where: { orderId: orderId, productId },
    });
    if (productInCart) {
      productInCart.quantity += parseInt(val);
      await productInCart.save();
      // this should really be returning the product ID
      res.send({ orderId, productId, productInCart });
    } else {
      res.send("Product not found in cart");
    }
  } catch (err) {
    next(err);
  }
});

//Update cart with deleting items
router.delete("/cart/:orderId/product/:productId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    const productCart = await Order_Products.findOne({
      where: { orderId: orderId, productId },
    });
    if (productCart) {
      await productCart.destroy();
      res.send(productId);
    } else {
      res.send("Product not found in cart");
    }
  } catch (err) {
    next(err);
  }
});

// router.delete("cart/:id");

module.exports = router;
