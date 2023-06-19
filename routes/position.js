
const { Router } = require("express");
const positionsRouter = Router();




// const express = require("express");
// // const Router = express.Router();
// // const { Router } = require(express);
// const positionsRouter = express.Router();
const positions = require("../controllers/positions");

positionsRouter.post("/", positions.createPosition);
positionsRouter.get("/", positions.getAllPosition);
positionsRouter.get("/:id", positions.getPositionById);
positionsRouter.delete("/", positions.deletePostion);
positionsRouter.patch("/:id", positions.updatePosition);
module.exports = positionsRouter;
