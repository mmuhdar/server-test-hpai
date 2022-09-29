const router = require('express').Router();

const { User: UserController } = require('../controllers/UserController');
const authenticationMiddleware = require('../middlewares/authentication');
const adminMiddlewate = require('../middlewares/authorization');

router.post('/login', UserController.login)
router.post('/users',authenticationMiddleware, UserController.create);
router.get('/users', authenticationMiddleware, UserController.getAllUsers)
router.get('/users/:id',authenticationMiddleware, UserController.getUserById)
router.delete('/users/:id', authenticationMiddleware, adminMiddlewate, UserController.deleteUserById)

module.exports = router;