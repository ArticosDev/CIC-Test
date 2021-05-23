const { response } = require("express");
const { Category } = require('../models')


// Get All categories
const getCategories = async(req, res = response) => {
    const { limit = 10, startFrom = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .skip(Number(startFrom))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
};



//Get an specific category
const getCategory = async(req, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('usuario', 'name');

    res.json(category);
};



// Update Category
const updateCategory = async(req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.uid;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);
};



//Disable category
const disableCategory = async(req, res = response) => {

    const { id } = req.params;
    const disabledCategory = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(disabledCategory);
};



//Create a neww category
const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne(name);

    //check if the category exist
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name }, ya existe.`
        });
    }

    //Generate data to be save
    const data = {
        name,
        user: req.uid
    };

    const category = new Category(data);

    //Save to DB
    await category.save();

    res.status(201).json(category);
};







module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    disableCategory
}