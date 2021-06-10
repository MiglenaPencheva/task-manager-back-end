const express = require('express');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
// const { auth } = require('../middlewares/authMiddleware');

module.exports = function (app) {

    app.engine('hbs', handlebars({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');

    app.use('/static', express.static('public'));

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    // app.use(auth);
};