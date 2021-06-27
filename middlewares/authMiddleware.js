const { COOKIE_NAME, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME];
    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                res.clearCookie(COOKIE_NAME);
            } else {
                req.user = decoded;
                res.locals.user = decoded;
                res.locals.isAuth = true;
            }
        });
    }
    next();
}

function isLogged(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth');
    }
    next();
}

function isGuest(req, res, next) {  
    if (req.user) {
        return res.redirect('/tasks/to-do');
    }
    next();
}

module.exports = {
    auth,
    isLogged,
    isGuest
}