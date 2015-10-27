/**
 * Module dependencies.
 */

var express 	= 	require('express'),
    bodyParser 	= 	require('body-parser'),
    mongoose    =   require("mongoose"),
    config = require("./config"),
    product = require("./routes/product");

var app = express();

//all environments
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Connecting to MongoDB using Mongoose.
 */
mongoose.connect(config.database, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to database");
    }
});

app.use("/api", product);

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.port);
    }
});