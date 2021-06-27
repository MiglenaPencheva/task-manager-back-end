const router = require('express').Router();
const { register, login } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('guestPage');
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) => { 
    const { username, password } = req.body;

    try {
        if (!username || !password) throw { message: 'Попълни всички полета!' };
        
        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/to-do');

    } catch (error) {
        return res.render('login', { error });
    }
});

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post('/register', isGuest(), async (req, res) => {
    let { username, password, repeatPassword } = req.body;
    
    try {
        if (!username || !password|| !repeatPassword) throw { message: 'Попълни всички полета!' };
        if (password != repeatPassword) throw { message: 'Паролите не съвпадат!' };
        
        await register(username, password);

        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/to-do');

    } catch (error) {
        return res.render('register', { error });
    }
});

router.get('/logout', isAuth(), (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/auth');
});

module.exports = router;