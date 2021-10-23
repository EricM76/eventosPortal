const {check,body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
    .notEmpty().withMessage('Debes ingresar tu nombre'),

    check('surname')
    .notEmpty().withMessage('Debes ingresar tu apellido'),

    check('genre')
    .notEmpty().withMessage('Debes ingresar tu género'),

    check('birthday')
    .notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),

    check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

    check('phone')
    .notEmpty().withMessage('Debes ingresar tu número de teléfono'),

    check('country')
    .notEmpty().withMessage('Debes ingresar tu país'),

    check('state')
    .notEmpty().withMessage('Debes ingresar tu provincia o región'),

    check('city')
    .notEmpty().withMessage('Debes ingresar tu ciudad'),

]