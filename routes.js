const router = require('express').Router();

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
// const { isGuest, isLogged } = require('./middlewares/authMiddleware');

router.use('/auth', authController);
router.use('/', taskController);

module.exports = router;