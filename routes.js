const router = require('express').Router();

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const { isAuth } = require('./middlewares/authMiddleware');

router.use('/auth', authController);
router.use('/', isAuth(), taskController);

module.exports = router;