const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma-db');

// General token verification middleware
const userToken = async (req, res, next) => {
  try {
    // Check if headers exist
    if (!req.headers) {
      return res.status(400).json({
        status: 'fail',
        message: 'Request headers are missing',
      });
    }

    // Check if authorization header exists
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      return res.status(401).json({
        status: 'fail',
        message: 'Authorization header missing or invalid format',
      });
    }

    // Extract token
    const token = req.headers.authorization.split(' ')[1];

    // Check if token exists after extraction
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Access token is missing',
      });
    }

    // Verify token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // Get user ID from the token payload
    const userId = decoded.id;

    // Check if this is an admin user
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (adminUser) {
      // This is an admin user
      req.user = {
        id: userId,
        role: adminUser.role || 'ADMIN',
        isAdmin: true,
      };
      return next();
    }

    // Check if this is a voter (regular user)
    const voterUser = await prisma.voters.findUnique({
      where: { studentId: userId },
    });

    if (voterUser) {
      // This is a voter user
      req.user = {
        id: userId,
        role: voterUser.role || 'USER',
        isAdmin: false,
      };
      return next();
    }

    // If we get here, the user ID from the token doesn't match any user
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  } catch (error) {
    // Handle token verification errors
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

// Admin-only authentication middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    // First verify the token using the general userToken middleware
    await userToken(req, res, () => {
      // This anonymous function will be called if userToken succeeds

      // Check if the user is an admin
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
          status: 'fail',
          message: 'Access denied. Admin privileges required.',
        });
      }

      // If we get here, the user is authenticated as an admin
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error',
      error: error.message,
    });
  }
};

module.exports = {
  userToken,
  authenticateAdmin,
};
