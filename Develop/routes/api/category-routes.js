const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryAll = await Category.findAll({
      include: [{ model: Product }]
    });
    console.log(categoryAll);
    res.json(categoryAll);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryItem = await Category.findByPk(req.params.id, 
      {
        include: [{ model: Product }]
      });
      console.log(categoryItem);
      res.json(categoryItem);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryNew = await Category.create({ category_name : req.body.category_name });
    console.log(categoryNew);
    res.json(categoryNew);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await categoryUpdate ({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      } 
    });
    console.log(categoryUpdate);
    res.json(categoryUpdate);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy ({
      where: {
        id: req.paras.id
      }
    });
    console.log(categoryDelete);
    res.json(categoryDelete);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
