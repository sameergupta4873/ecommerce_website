const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})

    res.json(products)
})

const getProductById = asyncHandler( async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    }else{
        res.status(500).json({message: 'Product not Found'})
    }
})

module.exports = {
    getProductById, getProducts
}