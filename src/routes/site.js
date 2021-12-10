const express = require('express');
const siteController = require('../controller/SiteController');
const router = express.Router();
router.get('/', siteController.home);

module.exports = router;
