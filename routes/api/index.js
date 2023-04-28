const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');

router.use('/user', userRoutes);
router.use('/friend', friendRoutes);

module.exports = router;