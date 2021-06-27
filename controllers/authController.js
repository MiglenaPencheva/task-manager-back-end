const router = require('express').Router();
const { register, login } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const { isLogged, isGuest } = require('../middlewares/authMiddleware');

router.get('/', isGuest, (req, res) => {
    res.render('guestPage');
})

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => { 
    const { username, password } = req.body;

    try {
        if (!username || !password) throw { message: 'Попълни всички полета!' };
        
        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/tasks/to-do');

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
        if (!username || !password|| !repeatPassword) throw { message: 'Попълни всички полета!' };
        if (password != repeatPassword) throw { message: 'Паролите не съвпадат!' };
        
        await register(username, password);

        let token = await login(username, password);
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/tasks/to-do');

    } catch (error) {
        return res.render('register', { error });
    }
});

router.get('/logout', isLogged, (req, res) => {
    console.log("logging outttt");
    res.clearCookie(COOKIE_NAME);
    res.redirect('/auth');
});

module.exports = router;