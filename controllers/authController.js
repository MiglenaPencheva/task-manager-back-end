const router = require('express').Router();
const { register, login } = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
// const { isLogged, isGuest } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('guestPage');
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => { 
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

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
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

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    // res.render('guestPage');
    res.redirect('/auth');
});

module.exports = router;