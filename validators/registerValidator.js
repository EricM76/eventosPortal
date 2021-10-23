const {check,body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
    .notEmpty().withMessage('Debes ingresar tu nombre'),

    check('email')
    .notEmpty().withMessage('El email es obligatorio'),

    check('pass')
    .isLength({
        min : 6,
        max:12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('email').custom(value => {
        return db.User.findOne({
            where : {
                email : value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject('Este email ya está registrado')
            }
        })
    }),

]