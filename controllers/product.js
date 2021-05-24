const { response } = require("express");
const { Product } = require('../models')


// Get All Products
const getProducts = async(req, res = response) => {

    const { limit = 10, startFrom = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('category', 'category')
        .skip(Number(startFrom))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
};



//Get an specific product
const getProduct = async(req, res = response) => {

    const { id } = req.params;
    // const product = await Product.findById(id).populate('usuario', 'name').populate('category', 'category');
    const product = await Product.findOne({ _id: id }).populate('usuario', 'name').populate('category', 'category');

    res.json(product);
};


// Update product
const updateProduct = async(req, res = response) => {

    const { id } = req.params;
    const data = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.uid;



    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json(product);
};


//createProduct, getProduct, getProducts, updateProduct, disableProduct
//Disable product
const disableProduct = async(req, res = response) => {

    const { id } = req.params;
    const disabledProduct = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(disabledProduct);
};



//Create a new product
const createProduct = async(req, res = response) => {

    const { status, user, ...body } = req.body;
    const productDB = await Product.findOne({ name: body.name });

    //check if the product exist checking by name
    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${ productDB.name }, ya existe.`
        });
    }

    //Generate data to be save
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.uid
    };

    const producto = new Product(data);

    //Save to DB
    await producto.save();

    res.status(201).json(producto);
};







module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    disableProduct
}