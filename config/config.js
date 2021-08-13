// const DATABASE_NAME = 'tasks';

const config = {
    development: {
        PORT: process.env.PORT || 3033,
        DB_URI: `mongodb://localhost/tasks`,
        SALT_ROUNDS: 10,
        SECRET: 'STAVAMNOGOSOLENO',
        COOKIE_NAME: 'TOKEN',
    },
    // production: {
    //     PORT: null || 80,
    //     DB_URI: `mongodb://localhost/task-manager`,
    //     SALT_ROUNDS: 10,
    //     SECRET: 'STAVAMNOGOSOLENO',
    //     COOKIE_NAME: 'TOKEN',
    // }

};

// module.exports = config;
module.exports = config[process.env.NODE_ENV.trim()];