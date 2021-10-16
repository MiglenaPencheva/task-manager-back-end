// const DATABASE_NAME = 'tasks';

const config = {
    development: {
        PORT: process.env.PORT || 3033,
        DB_URI: `mongodb://localhost/tasks`,
        SALT_ROUNDS: 10,
        SECRET: 'STAVAMNOGOSOLENO',
        COOKIE_NAME: 'TOKEN',
    },
    production: {
        PORT: null || 3333,
        DB_URI: `mongodb+srv://Mega:dhoToZTeigtBF0Zy@taskmanagercluster.an5m3.mongodb.net/test`,
        SALT_ROUNDS: 10,
        SECRET: 'STAVAMNOGOSOLENO',
        COOKIE_NAME: 'TOKEN',
    }
};

// dhoToZTeigtBF0Zy

// module.exports = config;
module.exports = config[process.env.NODE_ENV.trim()];