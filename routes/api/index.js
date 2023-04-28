const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const friendRoutes = require('./thoughtsRoutes');

router.use('/user', userRoutes);
router.use('/friend', friendRoutes);

module.exports = router;