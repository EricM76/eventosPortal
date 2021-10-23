var express = require('express');
var router = express.Router();

const {register,processRegister,list,remove,download, createExcel,preview,success} = require('../controllers/recordsController');

const adminCheck = require('../middlewares/adminCheck');
const recordValidator = require('../validators/recordValidator');


/* /records */
router.get('/register/:id',register);
router.post('/register/:id',recordValidator,processRegister);
router.get('/list',list);
router.delete('/remove/:id',remove);
router.get('/create-excel/:id',adminCheck, createExcel);
router.get('/download',adminCheck,download);
router.get('/form/preview',adminCheck,preview);
router.get('/success',success)

module.exports = router;
