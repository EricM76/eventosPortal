var express = require('express');
var router = express.Router();

const {index,admin} = require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck');
const {login} = require('../controllers/usersController')

router.get('/',adminCheck, admin);
router.get('/admin',adminCheck, admin);
router.get('/login',login);


module.exports = router;
