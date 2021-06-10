const DATABASE_NAME = 'tasks';

const config = {
    PORT: 3030,
    DB_URI: `mongodb://localhost/${DATABASE_NAME}`,
    SALT_ROUNDS: 10,
    SECRET: 'STAVAMNOGOSOLENO',
    COOKIE_NAME: 'TOKEN',
};

module.exports = config;