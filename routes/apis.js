var express = require('express');
var router = express.Router();

const {logos, removeLogos,getCallingCodes, changeActive, removeRecord} = require('../controllers/apiController');
const adminCheck = require('../middlewares/adminCheck');

/* /apis */
router.get('/logos', adminCheck, logos);
router.get('/logos/remove',adminCheck, removeLogos);
router.get('/callingCodes/:name',getCallingCodes);
router.post('/active/:id',changeActive);
router.post('/remove-record',removeRecord)

module.exports = router;