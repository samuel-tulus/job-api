const DB = require('../services/DBService');

const getUserByUsername = (username) => {
    const query = 'SELECT id, full_name, username, salt, password FROM users WHERE username = ?';
    const params = [ username ];

    return DB.sqlPromise(query, params);
};

module.exports = {
    getUserByUsername: getUserByUsername
};