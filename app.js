const express = require("express");
const bodyParser = require("body-parser");

const compression = require("compression");
const ejs = require("ejs");
const app = express();

const warezRouter = require("./routers/warez.router");

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(warezRouter);

app.listen(8080, () => {
    console.log("Server listening on localhost:8080")
})