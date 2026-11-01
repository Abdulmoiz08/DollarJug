const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminmiddleware');
const { getSalesAnalytics } = require('../controller/analyticsController');

const  router = express.Router();

router.get('/sales', protect, admin, getSalesAnalytics);

module.exports = router;