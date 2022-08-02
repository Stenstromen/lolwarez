const express = require("express");

const warezController = require("../controllers/warez.controller");
const warezRouter = express.Router();

warezRouter.get("/", warezController.sendIndex);

module.exports = warezRouter;