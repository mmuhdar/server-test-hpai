const router = require('express').Router();

const userRoutes = require('./userRouter');
const errorMiddleware = require('../middlewares/errorHandler');

router.use('/api',userRoutes);
router.use(errorMiddleware);

module.exports = router;