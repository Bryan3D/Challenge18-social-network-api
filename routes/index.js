const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/api', socialRoutes);

router.use((req, res) => res.send('This is the right route!'));

module.exports = router;