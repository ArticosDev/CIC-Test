const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategory, updateCategory, disableCategory } = require('../controllers/categorias');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existCategory } = require('../utilities/db-validators');

const router = Router();

/**
 * path/api/categories
 */

//Get all categories
router.get('/', getCategories);

//Get an specific category by id
router.get('/:id', [
    check('id', 'No es un ID de mongo válido.').isMongoId(),
    check('id').custom(existCategory),
    validarCampos,
], getCategory);

//create a category
router.post('/:name', [
    validarJWT,
    check('name', 'El nombre es obligatorio.').notEmpty(),
    validarCampos
], createCategory);

//update a category
router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio.').notEmpty(),
    check('id').custom(existCategory),
    validarCampos
], updateCategory);

//desactivate a category
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID de mongo válido.').isMongoId(),
    check('id').custom(existCategory),
    validarCampos
], disableCategory);


module.exports = router;