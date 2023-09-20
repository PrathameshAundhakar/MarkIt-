const express = require("express");
const db = require("./routes/db-config");
const app = express();
require("dotenv").config();

const createHttpError = require('http-errors');
const morgan = require('morgan');
app.use(morgan('dev'));
const session = require('express-session');
const connectFlask = require('connect-flash');

const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use(session({
    secret: "some secret message",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure:true,
        httpOnly: true
    }
})
);
app.use(connectFlask());

app.use('/', require("./routes/pages"));
// app.use("/api", require("./controllers/auth"));
// app.use('/', require('./routes/index.route'));
// app.use('/auth', require('./routes/auth.route'));
// app.use('/user', require('./routes/user.route'));

app.use((req, res, next) => {
    next(createHttpError.NotFound());
});
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error);
})
app.listen(PORT);

