const PORT = process.env.PORT || 8080, isLocal = (PORT === 8080);
const express = require('express'), app = express(), http = require('http').Server(app);

const database = require("./src/database");
const httpRouter = require('./src/express_api/httpRouter');
const {ErrorHandler} = require("./src/bot/errors/errorHandler");
const {Bot} = require('./src/bot/bot');

global.URL = isLocal ? `http://localhost:${PORT}` : APP_URL;

//** Start Database **/
database.getClient().catch(error => console.log(error));

//** Express Server **//
httpRouter.start(app);
http.listen(PORT, function () {
    console.info('\x1b[32m', 'Listening on:', PORT);
});

//** Discord Bot **//
new Bot().start().catch(error => {throw new ErrorHandler(error)});
