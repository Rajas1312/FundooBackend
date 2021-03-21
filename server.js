const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger/logger');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger/swagger.json')
const dbConnection = require("./config/database.config");
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
new dbConnection(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).connect().then((uri) => console.log("Connected to " + uri))
    .catch((err) => console.log("Could not connect database", err));
module.exports = app;