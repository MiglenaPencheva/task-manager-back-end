const router = require('express').Router();
const { register, login } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const { isLogged, isGuest } = require('../middlewares/authMiddleware');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username) throw { message: 'Username required' };
        if (!password) throw { message: 'Password required' };
        
        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        return res.render('login', { error });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    let { username, password, repeatPassword } = req.body;
    
    try {
        if (!username) throw { message: 'Username required' };
        if (!password) throw { message: 'Password required' };
        if (!repeatPassword) throw { message: 'Password required' };
        if (password != repeatPassword) throw { message: 'Password missmatch!' };
        
        await register(username, password);

        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        return res.render('register', { error });
    }
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;