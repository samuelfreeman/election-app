const express = require("express");
const { Router } = require(express);
const positionsRouter = Router();
const positions = require("../controllers/positions");

positionsRouter.post("/", positions.createPosition);
positionsRouter.get("/", positions.getAllPosition);
positionsRouter.get("/:id", positions.getPositionById);
positionsRouter.delete("/", positions.deletePostion);
positionsRoute.patch("/", positions.updatePosition);
module.exports = positionsRouter;
