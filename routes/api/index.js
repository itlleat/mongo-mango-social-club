const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;