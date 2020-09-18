const express = require("express");
const router = express.Router();
const paths = require("./paths/resultCheckPath");
const RsltCheckerController = require('../controllers/resultChecker');

// methods
router.post(paths.checkResult, RsltCheckerController.checkresult );
router.get(paths.getOurBalance, RsltCheckerController.getOurBalance);

module.exports = router;