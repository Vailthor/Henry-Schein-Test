const express = require('express');

const converterController = require('../controllers/converter');

const router = express.Router();

router.get('/', converterController.getConvertedString);

module.exports = router;