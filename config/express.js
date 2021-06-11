const express = require('express');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const cors = require('cors');
const secret = 'secret';
const { auth } = require('../middlewares/authMiddleware');

module.exports = function (app) {

    app.use(cors({
        origin: 'http://localhost:3030',
        credentials: true,
        exposedHeaders: 'Authorization'
    }));

    app.engine('hbs', handlebars({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');

    app.use('/static', express.static('public'));

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use(auth);
};