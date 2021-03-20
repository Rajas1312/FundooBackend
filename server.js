const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger/logger');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger/swagger.json')
require("./config/database.config")();
dotenv.config();
const port = process.env.PORT

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

require('./app/routes/user')(app);

// listen for requests
app.listen(port, () => {
    logger.info(`server is listining at port ${port}`)
});

module.exports = app;