const Mysql = require('mysql');
const Logger = require('../helpers/Logger');

const DBMSConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectionLimit: process.env.DB_CONN_LIMIT || 5
};

const DbPool = Mysql.createPool(DBMSConfig);

const destroyPool = () => {
    DbPool.end(err => {
        if (err) Logger.error(err);
        Logger.info('db-pool: Exit');
    });
};

const command = (sql, callback) => {
    DbPool.getConnection((err, connection) => {
        if (err) {
            Logger.error(err);
            return callback(err);
        }

        connection.query(sql, (error, results, fields) => {
            connection.release();
            if (error) {
                Logger.error(error);
                return callback(error);
            }

            callback(null, results);
        });
    });
};

const commandWithParams = (sql, params, callback) => {
    DbPool.getConnection((err, connection) => {
        if (err) {
            Logger.error(err);
            return callback(err);
        }

        connection.query(sql, params, (error, results, fields) => {
            connection.release();
            if (error) {
                Logger.error(error);
                return callback(error);
            }
    
            callback(null, results);
        });
    });
};

module.exports = {
    destroyPool: destroyPool,
    command: command,
    commandWithParams: commandWithParams
};