const express = require("express")
const router = express.Router()

// Handle API routes
router.use('/user', require('./user/controller'));
router.use('/user/collection', require('./user/collection/controller'));

module.exports = router;