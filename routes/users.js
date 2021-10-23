var express = require('express');
var router = express.Router();

const {register,processRegister,login,processLogin,remove,list, logout} = require('../controllers/usersController');

const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const adminCheck = require('../middlewares/adminCheck');

/* /users */
router.get('/register',adminCheck, register);
router.post('/register',registerValidator, processRegister);
router.post('/login',loginValidator, processLogin);
router.get('/list',adminCheck,list)
router.delete('/remove/:id',remove);
router.get('/logout',logout);

module.exports = router;
