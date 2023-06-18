
const { Router } = require("express");
const appRouter = Router();
// const express = require("express");
// const Router = express.Router();
// const appRouter = Router();
const candidates = require("./candidates");
const positions = require("./position");
const voters = require("./voters");

appRouter.use("/candidates", candidates);
appRouter.use("/positions", positions);
appRouter.use("/voters", voters);

module.exports = appRouter;
