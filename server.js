const Express = require('express');
const BodyParser = require('body-parser');
const App = Express();
const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, '../config/job-api.env')});
const Logger = require('./server/helpers/Logger');
const Cors = require('./server/middlewares/Cors');
const TransactionId = require('./server/middlewares/TransactionId');
const { destroyPool } = require('./server/services/MySQLService');

const AuthRoute = require('./server/routes/AuthRoute');
const JobRoute = require('./server/routes/JobRoute');

const PORT = process.env.PORT || 8080;
const API_PATH = process.env.API_PATH || '';
const BASE_PATH = API_PATH ? `/${API_PATH}`: '';
const BASE_URL = `localhost:${PORT}${BASE_PATH}`;

const server = App.listen(PORT, () => {
    Logger.info(`App Base Url: ${BASE_URL}`);
    Logger.info(`Communicating to DB: ${process.env.DB_HOST}`);
});

App.use(TransactionId);

App.use(Cors);

App.use(Express.json());

App.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
App.use(BodyParser.json({limit: '50mb'}));

App.use(`${BASE_PATH}/auth`, AuthRoute);
App.use(`${BASE_PATH}/jobs`, JobRoute);

App.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

const stopServer = () => {
    server.close(() => {
        Logger.info('server: Exit');
    });
};

process.on('exit', () => {
    destroyPool();
    stopServer();
});

process.on('SIGINT', () => {
    destroyPool();
    stopServer();
});

process.on('uncaughtException', err => {
    if (err) Logger.error(err);
    Logger.info('uncaughtException: Exit');
    destroyPool();
    stopServer();
    process.exit(99);
});