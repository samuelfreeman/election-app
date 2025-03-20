//  importing all dependencies ,controllers and validator
const { Router } = require('express');
const userRouter = Router();
const authentication = require('../validation/auth');
const verification = require('../verification/verifyusers');
// const candidate = require('../controllers/candidates');
const admin = require('../controllers/admin');
const userScheme = require('../schemes/userscheme');
const validation = require('../validation/user');

//  Routes
userRouter.post(
  '/register',
  [...userScheme],
  validation.checkUserExists,
  admin.saveUser,
);
userRouter.post('/login', authentication.userEmail, admin.login);

userRouter.get('/me', verification.userToken, admin.getMe);

// Admin-only routes
userRouter.get('/', verification.authenticateAdmin, admin.getAllUsers);
userRouter.get('/:id', verification.authenticateAdmin, admin.getSingleUser);
userRouter.patch(
  '/update/:id',
  verification.authenticateAdmin,
  admin.updateUser,
);
userRouter.delete('/:id', verification.authenticateAdmin, admin.deleteUser);

//  exporting all routes
module.exports = userRouter;
