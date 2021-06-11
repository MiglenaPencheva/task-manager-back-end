const router = require('express').Router();

// const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const { isLogged } = require('./middlewares/authMiddleware');

// router.use('/', homeController);
router.use('/auth', authController);
router.use('/', isLogged, taskController);

module.exports = router;