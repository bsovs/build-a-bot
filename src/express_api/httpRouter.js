const express = require('express'), path = require('path'), health = require('express-ping'),
    cors = require('cors'), cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'), router = express.Router();

const { HOME_PATH } = require('./config/constants');

const {cache} = require("./helper/cache");
const { handleError, ErrorHandler } = require('./errors/errorHandler')
const { ALLOW_ORIGIN } = require('./config/constants')
const cronJob = require('./helper/cronJob');

const start = function (app) {

    // -- middleware -- //
    app.use('/', router);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors({origin: ALLOW_ORIGIN}));
    app.use(cookieParser());
    app.use(health.ping());
    app.use(
        express.static(path.join(HOME_PATH, 'public'))
    );

    // start cronJobs
    cronJob.startCrons();

    // -- pages routes -- //

    router.get('/', (req, res) => {
        res.status(200).sendFile(path.join(HOME_PATH, 'public', 'index.html'));
    });

    // -- http commands -- //

    app.get('/error', (req, res, next) => {
        throw new ErrorHandler(501, 'error message');
    });

    app.get('/hello', cache(30), (req, res, next) => {
        Promise.resolve('HELLO').then(_data => res.status(200).send(_data)).catch(error => next(error));
    });

    // error handler middleware --must be last
    app.use((err, req, res, next) => {
        console.log(err);
        handleError(err, res);
    });
};

module.exports = {
    start
}
