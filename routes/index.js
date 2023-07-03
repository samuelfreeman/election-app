//importing express
const { Router } = require("express");
const appRouter = Router();

//importing   routes
const candidates = require("./candidates");
const positions = require("./position");
const voters = require("./voters");
const voting = require("./voting");
const user = require("./user");

//url use only
appRouter.use("/voting", voting);
appRouter.use("/candidates", candidates);
appRouter.use("/positions", positions);
appRouter.use("/voters", voters);
appRouter.use("/user", user);

// exporting  appRouter
module.exports = appRouter;
