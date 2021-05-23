const { Category, Product } = require('../models');

const existCategory = async(id) => {
    //Check if the category exist
    const exist = await Category.findById(id);
    if (!exist) {
        throw new Error(`El id no existe ${ id }`);
    }
};

const existProduct = async(id) => {
    //Check if the Product exist
    const exist = await Product.findById(id);
    if (!exist) {
        throw new Error(`El id no existe ${ id }`);
    }
};

module.exports = {
    existCategory,
    existProduct
};