const express = require('express');
const {getProductById,getProducts} = require('../controllers/productController')

const router = express.Router();
router.route('/products').get(getProducts)

router.route('/products/:id').get(getProductById)

module.exports = router;