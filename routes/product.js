const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProduct, getProducts, updateProduct, disableProduct } = require('../controllers/product');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existCategory, existProduct } = require('../utilities/db-validators');

const router = Router();

/**
 * path/api/categories
 */

//Get all Products
router.get('/', getProducts);

//Get an specific  Product by id
router.get('/:id', [
    //check('id', 'No es un ID de mongo válido.').isMongoId(),
    check('id').custom(existProduct),
    validarCampos,
], getProduct);

//create a  Product
router.post('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('cod', 'El codigo es obligatorio.').notEmpty(),
    check('stock', 'El stock es obligatorio.').notEmpty(),
    check('price', 'El precio es obligatorio.').notEmpty(),
    check('offertPrice', 'El precio de oferta es obligatorio.').notEmpty(),

    check('category', 'category No es un ID de mongo válido.').isMongoId(),
    check('user', 'user No es un ID de mongo válido.').isMongoId(),
    check('category').custom(existCategory),
    validarCampos
], createProduct);

//update a Product
router.put('/:id', [
    validarJWT,
    //check('category', 'No es un ID de mongo válido.').isMongoId(),
    //check('category').custom(existProduct),
    check('id').custom(existProduct),
    validarCampos
], updateProduct);

//disable a Product
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID de mongo válido.').isMongoId(),
    check('id').custom(existProduct),
    validarCampos
], disableProduct);


module.exports = router;