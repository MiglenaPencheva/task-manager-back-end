const router = require('express').Router();

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const { isGuest, isLogged } = require('./middlewares/authMiddleware');

router.use('/auth', isGuest, authController);
router.use('/', isLogged, taskController);

module.exports = router;