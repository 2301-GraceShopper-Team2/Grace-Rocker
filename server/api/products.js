const router = require('express').Router();
const {
  models: { Product },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/featured', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      limit: 3,
      order: [['updatedAt', 'DESC']],
    });
    if (!products.length) {
      res.status(404).send('Error 404 Error Loading Featured Products');
    }
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).send('Error 404 Product Not Found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).send('Error 400: Invalid Entry');
    }
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    const response = await product.update(req.body);

    res.send(response);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).send('Error 400: Invalid Entry');
    }
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).send('Error 404 Product Not Found');
    }
    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
