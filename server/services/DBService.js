const MySQLService = require('./MySQLService');
const Logger = require('../helpers/Logger');

const sqlPromise = (sql, params = null) => {
    if (params) {
        return new Promise((resolve, reject) => {
            MySQLService.commandWithParams(sql, params, (err, res) => {
                if (err) reject(err);
                resolve(res)
            });
        });
    }

    return new Promise((resolve, reject) => {
        MySQLService.command(sql, (err, res) => {
            if (err) reject(err);
            resolve(res)
        });
    });
};

module.exports = {
    sqlPromise: sqlPromise
};