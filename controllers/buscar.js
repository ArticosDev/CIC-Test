const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Product, Category } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categories',
    'products'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if (isMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ name: regex }, { email: regex }]
    });

    res.json({
        results: usuarios
    });
};

const buscarCategories = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if (isMongoID) {
        const category = await Category.findById(termino);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: categories
    });
};

const buscarProducts = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if (isMongoID) {
        const product = await Product.findById(termino);
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const products = await Product.find({
        $or: [{ name: regex }, { cod: regex }]
    });

    res.json({
        results: products
    });
};


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categories':
            buscarCategories(termino, res);
            break;
        case 'products':
            buscarProducts(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Error de servidor, actualizar colecciones permitidas.'
            });
            break;
    }

};

module.exports = {
    buscar
}