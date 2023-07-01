//importing express
const { Router } = require("express");
const appRouter = Router();

//importing   routes
const candidates = require("./candidates");
const positions = require("./position");
const voters = require("./voters");
const voting = require("./voting");

//url use only
appRouter.use("/voting", voting);
appRouter.use("/candidates", candidates);
appRouter.use("/positions", positions);
appRouter.use("/voters", voters);

// exporting  appRouter
module.exports = appRouter;
