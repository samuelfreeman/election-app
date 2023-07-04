//importing all dependencies
const { Router } = require("express");
const userRouter = Router();
const authentication = require("../validation/auth");
const verification = require("../verification/verifyusers");
const candidate = require("../controllers/candidates");
const user = require("../controllers/user");
const validation = require("../validation/user");
//Routes
userRouter.get("/login/", authentication.userEmail, user.login);
userRouter.get("/candidates",candidate.getAllCandidates);
userRouter.post("/", validation.checkUserExists, user.saveUser);
userRouter.get("/", user.getAllUsers);
userRouter.get("/:id",  user.getSingleUser);
userRouter.delete("/:id",  user.deleteUser);
userRouter.patch("/:id", user.updateUser);
//exporting all routes
module.exports = userRouter;
