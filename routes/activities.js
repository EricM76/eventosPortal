var express = require('express');
var router = express.Router();

const {add,save,list,edit,update,remove, search} = require('../controllers/activitiesController');
const adminCheck = require('../middlewares/adminCheck');

/* /activities */
router.get('/add', adminCheck, add);
router.post('/add', save);
router.get('/list',adminCheck, list);
router.get('/edit/:id',adminCheck,edit);
router.put('/edit/:id',update);
router.delete('/remove/:id',remove);
router.get('/search',adminCheck, search)
module.exports = router;
