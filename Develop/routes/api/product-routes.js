const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const allProducts = await Product.findAll({
      include: [{ model : Category, model : Tag }]
    });
    console.log(allProducts);
    res.json(allProducts);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productItem = await Product.findByPk(req.params.id,
      {
        include: [{ model: Category, model: Tag }]
      })
      console.log(productItem);
      res.json(productItem);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
});
// update product
router.put('/:id', async (req, res) => {
  // update product data
  const updateProduct = await Product.update(req.product_name, {
    where: {
      id: req.params.id,
    },
  })
  res.json(updateProduct)
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deleteProduct = await Product.destroy ({
      where: {
        id: req.params.id
      }
    });
    console.log(deleteProduct);
    res.json(deleteProduct);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;


// if (req.body.tagIds.length) {