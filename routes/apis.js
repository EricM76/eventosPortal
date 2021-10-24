var express = require('express');
var router = express.Router();

const {logos, removeLogos,getCallingCodes} = require('../controllers/apiController');
const adminCheck = require('../middlewares/adminCheck');

/* /apis */
router.get('/logos', adminCheck, logos);
router.get('/logos/remove',adminCheck, removeLogos);
router.get('/callingCodes/:name',getCallingCodes)

module.exports = router;