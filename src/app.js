const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const bodyParser = require("body-parser")

dotenv.config();

const errorHandler = require("./middlewarers/error-handler.middleware")

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', async (req, res) => {
    res.send("Wow!😯 are you here🙃🙃 application running!!! 😜😜😜")
})

/* 404 page handelling */
app.use((req, res, next) => {
    let error = new Error("404 page not found.")
    error.status = 404
    next(error)
})

/* Error handler middleware */
app.use(errorHandler)

module.exports = app