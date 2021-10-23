var express = require('express');
var router = express.Router();

const imagesStorage = require('../middlewares/imagesStorage');
const {add,save,detail,edit,update,remove,activity, search, order, createExcel} = require('../controllers/eventsController');
const adminCheck = require('../middlewares/adminCheck');

/* /events */
router.get('/add', adminCheck, add);
router.post('/add', imagesStorage.any(), save);
router.get('/detail/:id',adminCheck, detail);
router.get('/edit/:id',adminCheck,edit);
router.put('/edit/:id',imagesStorage.any(),update);
router.delete('/remove/:id',remove);
router.post('/activity',activity);
router.get('/edit/:id',adminCheck,edit);
router.get('/search',adminCheck,search);
router.get('/order',adminCheck,order);
router.get('/create-excel',adminCheck,createExcel);

module.exports = router;
