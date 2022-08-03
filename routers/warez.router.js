const express = require("express");

const warezController = require("../controllers/warez.controller");
const warezRouter = express.Router();

warezRouter.get("/", warezController.sendIndex);
warezRouter.get("/:id", warezController.sendFile);
warezRouter.post("/", warezController.getFile);

module.exports = warezRouter;