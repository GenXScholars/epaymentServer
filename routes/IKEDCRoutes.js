const express = require('express');
const router = express.Router();
const paths = require('./paths/IKEDCpaths');
const IKEDCController = require('../controllers/IKEDC');

// methods
router.post(paths.getAccountDetails, IKEDCController.getAccountDetails);
router.post(paths.getUserTransactions, IKEDCController.getAllTransactionDetail);
router.post(paths.getDealerBalance, IKEDCController.getOurBalance);
router.post(paths.rechargeMeter, IKEDCController.rechargeMeter);

module.exports = router;